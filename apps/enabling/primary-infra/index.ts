import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as command from "@pulumi/command";

const bucketName = "ephemeral-buckett";

// Build the application
const buildApp = new command.local.Command("build-app", {
  create: "npm run build", // replace with your build command
  dir: `${__dirname}/app-directory`, // replace with your application directory
});

// Create an AWS resource (S3 Bucket)
let bucket = new aws.s3.Bucket(bucketName, {});
