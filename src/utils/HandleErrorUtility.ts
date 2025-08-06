export class HandleErrorUtility{

  static handleError(err:unknown,custom:string="Something went wrong"):string{
    return err instanceof Error ?err.message:custom
  }
}