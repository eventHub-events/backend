export interface IS3Service{
  generatePresignedUrl(key:string,contentType:string):Promise<string>
}