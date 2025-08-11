
import { ISeedAdmin } from "../application/interface/admin/ISeedAdmin";
import { ILoggerService } from "../application/interface/common/ILoggerService";
import { IHashService } from "../application/interface/user/IHashService";
import { DbConnection } from "../config/mongoose/DbConnection";
import { IUserRepository } from "../domain/repositories/user/IUserRepository";
import dotenv from "dotenv"
dotenv.config()



import { UserRegisterDTO } from "../domain/dtos/user/RegisterUserDTO";

export class SeedAdmin implements ISeedAdmin{

  private name:string;
   private email:string;
   private password:string

  constructor(private _userRepo:IUserRepository,private _hashService:IHashService,private _logger:ILoggerService
  ){
this.name = process.env.ADMIN_NAME ||""
    this.email = process.env.ADMIN_EMAIL ||""
    this.password = process.env.ADMIN_PASSWORD ||""
    

  }

  async execute(){
    try{
 await DbConnection.connect()
      const existingAdmin= await this._userRepo.verifyUser(this.email);
      if(existingAdmin?.role==="admin"){
        this._logger.info(`Admin already exists: ${existingAdmin.email}`);
        return;
      }
      console.log("admin email",this.email,this.password)
      const adminDTO = new UserRegisterDTO({
        name: this.name,
        email: this.email,
        password: this.password,
        phone: 9999999999,
        isVerified: true,
        role: "admin",
      });
    
      adminDTO.password = await this._hashService.hash(this.password);
      
      const result=await this._userRepo.createUser(adminDTO)
      console.log("result is ",result)
     
      this._logger.info(`admin created :${this.email}`);
    
     

  }catch(error){
    this._logger.error("Error seeding admin",error);
  }finally{
      process.exit(0)
  }

}
}