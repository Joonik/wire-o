# Wire-O

## Setup and Deployment

### First things first: Get the tools you need

You can use the AWS Console, but the AWS CLI allows for the scripting of Lambda uploads. Here's how to get it:

1. Install pip first if you don't have it already with `sudo easy_install pip` (on Mac OSX)
2. Install the CLI with `sudo -H pip install awscli --upgrade --ignore-installed six` (on Mac OSX)

After the AWS CLI is installed...

1. Find your Access Key & Secret Access Keys, and [make sure you have the permissions you need](http://docs.aws.amazon.com/IAM/latest/UserGuide/access.html) to access AWS.
2. Run `aws configure`.
3. Put in the Access & Secret Access keys.
4. Install the [Serverless](https://serverless.com/) framework.

### Create `wire-o.yml` and set variables

1. Create a `wire-o.yml` file at root.
2. Define `s3BucketName` and `s3KeyName` variables in the `wire-o.yml` file. These two variables are set in the `serverless.yml` file and used in the JavaScript code.

```
s3BucketName: "s3-bucket-name-goes-here"
s3KeyName: "s3-key-name-goes-here"
```

### Compile JavaScript

Compiled code will go into the `dist` folder.

1. Run `babel lib --out-dir dist`.

### Deploy

1. Run `serverless deploy`.

## The Endpoint

After you run `serverless deploy`, you will h ave created an API Gateway endpoint that accepts POST requests and triggers a Lambda Function to run. You will see the URL in your console output, which will look something like this:

`https://o64722rmyh.execute-api.us-east-1.amazonaws.com/dev/merge`

An API Endpoint is set up with AWS API Gateway. With this endpoint, the JSON request body accepts an array of `pdfUrls` as a query string:

```
https://o64722rmyh.execute-api.us-east-1.amazonaws.com/dev/merge?pdfUrls=["https://s3.amazonaws.com/superglue/hello.pdf"]
```

The JSON response body provides a link to the merged PDF hosted on S3:

```
{
  "mergedPdf": "https://s3.amazonaws.com/superglue/merged/1ed989e5-026d-41f6-917f-953b4fd35bd8.pdf"
}
```
