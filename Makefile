# ──────────────────────────────────────────────────────────────
# Cloud Resume Challenge — Makefile
#
# Prerequisites (install once):
#   brew install awscli         # or: pip install awscli
#   brew install aws-sam-cli    # or: pip install aws-sam-cli
#   aws configure               # enter your IAM key/secret
#
# Usage:
#   make deploy   — build SAM template + upload stack to AWS
#   make sync     — push HTML/CSS/JS files to S3
#   make open     — print the CloudFront URL
#   make destroy  — delete the entire stack (stops all charges)
# ──────────────────────────────────────────────────────────────

STACK_NAME  ?= cloud-resume
REGION      ?= ap-southeast-2          # Sydney — change if you prefer another region
SAM_BUCKET  ?= sam-deploy-$(shell aws sts get-caller-identity --query Account --output text)

# ── Deploy infrastructure (SAM build + deploy) ───────────────
.PHONY: deploy
deploy:
	@echo "→ Building SAM template..."
	sam build
	@echo "→ Deploying stack '$(STACK_NAME)' to $(REGION)..."
	sam deploy \
	  --stack-name $(STACK_NAME) \
	  --region $(REGION) \
	  --s3-bucket $(SAM_BUCKET) \
	  --s3-prefix $(STACK_NAME) \
	  --capabilities CAPABILITY_IAM \
	  --no-fail-on-empty-changeset \
	  --parameter-overrides ProjectName=$(STACK_NAME)
	@echo "→ Done. Stack outputs:"
	@aws cloudformation describe-stacks \
	  --stack-name $(STACK_NAME) \
	  --region $(REGION) \
	  --query "Stacks[0].Outputs" \
	  --output table

# Create the SAM deployment bucket if it doesn't exist yet
.PHONY: bootstrap
bootstrap:
	@aws s3 mb s3://$(SAM_BUCKET) --region $(REGION) 2>/dev/null || true
	@echo "SAM bucket ready: s3://$(SAM_BUCKET)"

# ── Sync static files to S3 ──────────────────────────────────
.PHONY: sync
sync:
	$(eval BUCKET := $(shell aws cloudformation describe-stacks \
	  --stack-name $(STACK_NAME) --region $(REGION) \
	  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
	  --output text))
	@echo "→ Syncing files to s3://$(BUCKET)..."
	aws s3 sync . s3://$(BUCKET) \
	  --exclude ".git/*" \
	  --exclude "src/*" \
	  --exclude "Makefile" \
	  --exclude "template.yaml" \
	  --exclude "*.JPG" \
	  --exclude "CNAME" \
	  --delete
	@echo "→ Sync complete."

# ── Print the live URL ───────────────────────────────────────
.PHONY: open
open:
	@aws cloudformation describe-stacks \
	  --stack-name $(STACK_NAME) --region $(REGION) \
	  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" \
	  --output text

# ── Update counter.js with the real API endpoint ─────────────
.PHONY: patch-counter
patch-counter:
	$(eval API_URL := $(shell aws cloudformation describe-stacks \
	  --stack-name $(STACK_NAME) --region $(REGION) \
	  --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" \
	  --output text))
	@echo "→ Patching counter.js with: $(API_URL)"
	@sed -i 's|https://YOUR_API_ID.*amazonaws.com.*|$(API_URL)";|' counter.js
	@echo "→ Done. Run 'make sync' to re-upload."

# ── Tear everything down (avoid ongoing charges) ─────────────
.PHONY: destroy
destroy:
	$(eval BUCKET := $(shell aws cloudformation describe-stacks \
	  --stack-name $(STACK_NAME) --region $(REGION) \
	  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
	  --output text 2>/dev/null))
	@echo "→ Emptying bucket s3://$(BUCKET)..."
	@aws s3 rm s3://$(BUCKET) --recursive 2>/dev/null || true
	@echo "→ Deleting stack..."
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(REGION)
	@echo "→ Stack deletion triggered (takes ~2 min). Watch in the AWS Console."
