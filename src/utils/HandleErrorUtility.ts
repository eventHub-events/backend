export class HandleErrorUtility{

  static  handleError(err:unknown,custom:string="Something went wrong"):string{
    console.log("error issss",err)
    return err instanceof Error ?err.message:custom
  }
}