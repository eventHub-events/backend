export interface IGoogleAuthUseCase{
   execute(googleUser:{googleId: string; email?: string; name?: string; picture?:string}): Promise<void> ;
}