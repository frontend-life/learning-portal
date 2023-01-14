import aws from "aws-sdk";

const { space_name, do_space_url, access_key_id, secret_access_key } =
  process.env;

function getSpaces() {
  if (space_name && do_space_url && access_key_id && secret_access_key) {
    // Create a new S3 instance for interacting with our DO space. We use S3 because
    // the API is the same between DO Spaces and AWS S3.
    return new aws.S3({
      endpoint: new aws.Endpoint(do_space_url),
      accessKeyId: access_key_id,
      secretAccessKey: secret_access_key,
    });
  }

  return null;
}

export function getSignedUrl(file_name: string, file_type: string) {
  const spaces = getSpaces();

  if (!spaces || !space_name) {
    return null;
  }

  const params = {
    Bucket: space_name,
    Key: file_name,
    Expires: 60 * 3, // Expires in 3 minutes
    ContentType: file_type,
    ACL: "public-read", // Remove this to make the file private
  };

  return spaces.getSignedUrl("putObject", params);
}
