import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an IAM user
const pulumiUser = new aws.iam.User("pulumi-user");

// Create API keys for the user
const pulumiAccessKey = new aws.iam.AccessKey("pulumi-access-key", {
  user: pulumiUser.name,
});

// Use the ARN of your IAM user as the Principal in your bucket policy
const bucket = new aws.s3.Bucket("my-bucket");
const bucketPolicy = new aws.s3.BucketPolicy("my-bucket-policy", {
  bucket: bucket.id,
  policy: pulumi
    .all([bucket.arn, pulumiUser.arn])
    .apply(([bucketArn, userArn]) =>
      JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "PulumiDeleteObject",
            Effect: "Allow",
            Principal: { AWS: userArn },
            Action: "s3:DeleteObject",
            Resource: bucketArn + "/*",
          },
        ],
      })
    ),
});

// Export the access keys, you will need them to configure the AWS provider in Pulumi
export const accessKeyId = pulumiAccessKey.id;
export const secretAccessKey = pulumiAccessKey.secret;
