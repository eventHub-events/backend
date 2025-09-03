export interface IGeneratePresignedUrlUseCase{
  execute(fileName:string,contentType:string):Promise<string>
}