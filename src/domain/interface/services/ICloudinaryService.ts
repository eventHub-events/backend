export interface ICloudinaryService {
  generateUploadSignature(params : {folder :string;}) : Promise<{signature : string; timestamp : number; apiKey : string; cloudName :string; folder :string}>;
}