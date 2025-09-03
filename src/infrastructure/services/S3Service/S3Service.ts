import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IS3Service } from "../../interface/IS3Service";
import {config} from "dotenv";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
config()


export class S3Service implements IS3Service {
  private _s3Client:S3Client;
  private bucketName:string;
constructor(){
  
    this.bucketName = process.env.S3_BUCKET_NAME!
    this._s3Client= new S3Client({
      region:process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
}
async generatePresignedUrl(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(this._s3Client, command, { expiresIn: 300 }); // 5 mins
    return signedUrl;
  }

}