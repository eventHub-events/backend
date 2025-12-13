export interface IStorageService {
  uploadBuffer(buffer: Buffer, filePath: string): Promise<string>;
}
