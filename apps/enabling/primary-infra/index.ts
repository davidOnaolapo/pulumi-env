import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketName = "ephemeral-bucket";

// Create an AWS resource (S3 Bucket)
let bucket = new aws.s3.Bucket(bucketName, {});

// Create an S3 bucket policy to allow public deletion
let deletionPolicy = new aws.s3.BucketPolicy(`${bucketName}Policy`, {
  bucket: bucket.id,
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PublicDelete",
        Effect: "Allow",
        Principal: "*",
        Action: "s3:DeleteObject",
        Resource: pulumi.interpolate`${bucket.arn}/*`,
      },
    ],
  },
});
