import { Types } from "mongoose";
import { IStripeAccountEntityFactory } from "../../../application/interface/factories/organizer/IStripeAccountEntityFactory";
import { OrganizerStripeAccountEntity } from "../../../domain/entities/organizer/OrganizerStripeAccountEntity";
import { IOrganizerStripeAccountRepository } from "../../../domain/repositories/organizer/IOrganizerStripeAccountRepository";
import { OrganizerStripeAccountDbModel } from "../../../domain/types/OrganizerTypes";
import { IOrganizerStripeAccount, OrganizerStripeAccountModel } from "../../db/models/organizer/organizer-stripe-account/OrganizerStripeAccountModel";
import { BaseRepository } from "../BaseRepository";

export class OrganizerStripeAccountRepository extends BaseRepository<IOrganizerStripeAccount> implements IOrganizerStripeAccountRepository {
   constructor(
      private _stripeAccountEntityFactory : IStripeAccountEntityFactory
   ){
     super(OrganizerStripeAccountModel)
   }
 async createStripeAccount(stripeAccountEntity: OrganizerStripeAccountEntity): Promise<OrganizerStripeAccountEntity> {

         const organizerId  = new Types.ObjectId(stripeAccountEntity.organizerId);
        const entityData = await super.create({...stripeAccountEntity,organizerId}) as OrganizerStripeAccountDbModel;
    return this._stripeAccountEntityFactory.toDomain(entityData);

 }
 async getStripeAccounts(organizerId : string): Promise<OrganizerStripeAccountEntity[]> {
     const entities = await super.findAll({organizerId:new Types.ObjectId(organizerId)}) as OrganizerStripeAccountDbModel[];
     
     return this._stripeAccountEntityFactory.toDomainList(entities);
 }

 async updateStripeAccount(organizerId: string,stripeAccountEntity: OrganizerStripeAccountEntity): Promise<OrganizerStripeAccountEntity> {
     const updated = await super.update(organizerId, stripeAccountEntity) as OrganizerStripeAccountDbModel
    return this._stripeAccountEntityFactory.toDomain(updated);
 }
async getStripeAccountByStripeId( stripeAccountId : string) : Promise<OrganizerStripeAccountEntity> {
       
      const stripeAccount = await super.findOne({stripeAccountId}) as OrganizerStripeAccountDbModel;
   return this._stripeAccountEntityFactory.toDomain(stripeAccount);
}
}