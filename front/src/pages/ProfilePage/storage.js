// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
    endpoint: 'https://ams3.cdn.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: 'ams3', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
        accessKeyId: 'DO009B683GZ4WXN6U33D', // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: 'wLY/fhPcY2xneBgc0K59DfhkEKjmK0uHk8iyW+Im7sc' // Secret access key defined through an environment variable.
    }
});

// Step 3: Define the parameters for the object you want to upload.
const params = {
    Bucket: 'the-labl-academy-store-screen-video', // The path to the directory you want to upload the object to, starting with your Space name.
    Key: 'hello-world.txt', // Object key, referenced whenever you want to access this file later.
    Body: 'Hello, World!', // The object's contents. This variable is an object, not a string.
    ACL: 'public', // Defines ACL permissions, such as private or public.
    Metadata: {
        // Defines metadata tags.
        'x-amz-meta-my-key': 'your-value'
    }
};

// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
export const uploadObject = async () => {
    try {
        const data = await s3Client.send(new PutObjectCommand(params), {
            credentials: false
        });
        console.log(
            'Successfully uploaded object: ' + params.Bucket + '/' + params.Key
        );
        return data;
    } catch (err) {
        console.log('Error', err);
    }
};

// Step 5: Call the uploadObject function.
// uploadObject();
