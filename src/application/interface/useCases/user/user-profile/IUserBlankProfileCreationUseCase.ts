export interface IUserBlankProfileCreationUseCase {
  createBlankProfile(userId :string):Promise<string> ;
}