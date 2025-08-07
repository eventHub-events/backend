
import { ISeedAdmin } from "../application/interface/admin/ISeedAdmin";
import { ILoggerService } from "../application/interface/common/ILoggerService";
import { IHashService } from "../application/interface/user/IHashService";
import { DbConnection } from "../config/mongoose/DbConnection";
import { IUserRepository } from "../domain/repositories/user/IUserRepository";



import { UserRegisterDTO } from "../domain/dtos/user/RegisterUserDTO";

export class SeedAdmin implements ISeedAdmin{

  private name:string;
   private email:string;
   private password:string

  constructor(private _userRepo:IUserRepository,private _hashService:IHashService,private _logger:ILoggerService
  ){
this.name = process.env.ADMIN_NAME || "SuperAdmin";
    this.email = process.env.ADMIN_EMAIL || "admin@eventhub.com";
    this.password = process.env.ADMIN_PASSWORD || "Pulser@1234"
    

  }

  async execute(){
    try{
 await DbConnection.connect()
      const existingAdmin= await this._userRepo.verifyUser(this.email);
      if(existingAdmin?.role==="admin"){
        console.log("admin already exists",existingAdmin.email)
        this._logger.info(`Admin already exists: ${existingAdmin.email}`);
        return;
      }
      const adminDTO = new UserRegisterDTO({
        name: this.name,
        email: this.email,
        password: this.password,
        phone: 9999999999,
        isVerified: true,
        role: "admin",
      });
    
      adminDTO.password = await this._hashService.hash(this.password);
      
      await this._userRepo.createUser(adminDTO)
     
      this._logger.info(`admin created :${this.email}`);
    
     

  }catch(error){
    this._logger.error("Error seeding admin",error);
  }finally{
      process.exit(0)
  }

}
}