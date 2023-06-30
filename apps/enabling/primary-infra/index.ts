import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucketName = "ephemeral-buckett";

// Create an AWS resource (S3 Bucket)
let bucket = new aws.s3.Bucket(bucketName, {});
