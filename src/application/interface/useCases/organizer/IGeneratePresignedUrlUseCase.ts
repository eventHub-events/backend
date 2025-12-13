export interface IGeneratePresignedUrlUseCase {
  execute(fileName: string, contentType: string): Promise<string>;
  getViewUrl(key: string): Promise<string>;
}
