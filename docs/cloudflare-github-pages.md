# Cloudflare + GitHub Pages DNS setup for `quanbui.dev`

Last verified: 2026-06-09T12:24:57+10:00

This document records the non-secret Cloudflare DNS and GitHub Pages configuration for the portfolio site.

> Security note: do **not** store Cloudflare API tokens, GitHub tokens, or other credentials in this repository or in Markdown files. If a token has been pasted into chat or a terminal, rotate/revoke it after use.

## Goal

Serve the portfolio site from GitHub Pages at:

- `https://quanbui.dev`
- `https://www.quanbui.dev` redirecting to `https://quanbui.dev`

Keep the F1 dashboard subdomain untouched:

- `https://f1.quanbui.dev`

## GitHub Pages repository

- Repository: `tanquanbui/tanquanbui.github.io`
- Pages custom domain: `quanbui.dev`
- HTTPS enforced: `true`
- Required repo files:
  - `CNAME` containing `quanbui.dev`
  - `public/CNAME` containing `quanbui.dev`

## Cloudflare DNS records

All GitHub Pages records should be **DNS-only** in Cloudflare, not proxied.

### Apex domain: `quanbui.dev`

```text
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
```

### WWW: `www.quanbui.dev`

```text
CNAME  www  tanquanbui.github.io
```

### F1 dashboard: `f1.quanbui.dev`

Preserve this record. Do not delete or replace it when changing portfolio DNS.

```text
CNAME  f1  d13188yck2eq19.cloudfront.net
```

## Verification commands

Check Cloudflare authoritative DNS:

```bash
dig +short @rosalyn.ns.cloudflare.com quanbui.dev A
dig +short @rosalyn.ns.cloudflare.com quanbui.dev AAAA
dig +short @rosalyn.ns.cloudflare.com www.quanbui.dev CNAME
dig +short @rosalyn.ns.cloudflare.com f1.quanbui.dev CNAME
```

Check public resolver propagation:

```bash
dig +short @1.1.1.1 quanbui.dev A
dig +short @1.1.1.1 quanbui.dev AAAA
dig +short @1.1.1.1 www.quanbui.dev CNAME
```

Check GitHub Pages settings:

```bash
gh api repos/tanquanbui/tanquanbui.github.io/pages \
  --jq '{cname:.cname,html_url:.html_url,https_enforced:.https_enforced,cert:.https_certificate}'
```

Check live HTTPS:

```bash
curl -I -L https://quanbui.dev
curl -I -L https://www.quanbui.dev
curl -I -L https://f1.quanbui.dev
```

Expected results:

- `https://quanbui.dev` returns `HTTP/2 200`
- `https://www.quanbui.dev` returns `301` to `https://quanbui.dev/`, then `HTTP/2 200`
- `https://f1.quanbui.dev` returns `HTTP/2 200` from CloudFront/S3

## If GitHub Pages HTTPS setup fails

If this command fails with `The certificate does not exist yet`:

```bash
gh api --method PUT repos/tanquanbui/tanquanbui.github.io/pages \
  -f cname=quanbui.dev \
  -F https_enforced=true
```

Use a two-step update instead:

```bash
# First set only the CNAME.
gh api --method PUT repos/tanquanbui/tanquanbui.github.io/pages --input - <<'JSON'
{"cname":"quanbui.dev"}
JSON

# Wait until the certificate state becomes approved.
gh api repos/tanquanbui/tanquanbui.github.io/pages \
  --jq '{cname:.cname,cert:.https_certificate}'

# Then enforce HTTPS.
gh api --method PUT repos/tanquanbui/tanquanbui.github.io/pages --input - <<'JSON'
{"https_enforced":true}
JSON
```
