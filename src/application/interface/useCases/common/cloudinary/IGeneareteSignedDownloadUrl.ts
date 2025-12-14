export interface IGenerateSignedDownloadUrlUseCase {
  execute(publicId: string): Promise<string>;
}
