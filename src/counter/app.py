"""
Visitor counter Lambda — Cloud Resume Challenge Step 5.

Every POST to /counter atomically increments a DynamoDB counter
and returns the new total as JSON.  A single item with id="counter"
holds the running total in the 'count' attribute.

DynamoDB data model:
  Table:  cloud-resume-visitors
  Item:   { id: "counter", count: <Number> }
"""
import json
import os
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])

CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",   # tighten to your CloudFront domain after deploy
    "Access-Control-Allow-Methods": "POST,OPTIONS",
}


def lambda_handler(event, context):
    # Handle CORS pre-flight (browser sends OPTIONS before POST)
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    try:
        response = table.update_item(
            Key={"id": "counter"},
            # ADD creates the attribute if it doesn't exist yet (first visitor = 1)
            UpdateExpression="ADD #c :inc",
            ExpressionAttributeNames={"#c": "count"},
            ExpressionAttributeValues={":inc": 1},
            ReturnValues="UPDATED_NEW",
        )
        count = int(response["Attributes"]["count"])
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"count": count}),
        }
    except ClientError as e:
        print(f"DynamoDB error: {e}")
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "Could not update counter"}),
        }
