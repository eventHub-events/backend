
import { FilterQuery } from "mongoose";
import { UserEntity } from "../../entities/User";
import { UserFilterOptions } from "../../../application/DTOs/common/userFilterOptions";


export interface UserCountSummary {
  totalUsers: number;
  activeUsers: number;
  totalOrganizers: number;
  activeOrganizers: number;
}

export interface IUserRepository {
   createUser(user: UserEntity) : Promise< UserEntity>;
   findByEmail(email: string) : Promise<UserEntity | null>;
   findUserById(userId: string): Promise<UserEntity| null>;
   verifyUser(email: string): Promise<UserEntity | null> ;
   findAllUsers(filter: UserFilterOptions): Promise<{users: UserEntity[]; total: number} | null>;
   findAllWithFilter(filter : FilterQuery<UserEntity> ): Promise< UserEntity[] | null > ;
   updateUser (userId: string, data: Partial<UserEntity>): Promise<UserEntity> ;
   UpdateUserByEmail(email: string, data: Partial<UserEntity>) : Promise<UserEntity>;
   getUserCountSummary(): Promise<UserCountSummary>;
   getVerifiedOrganizers(): Promise<number>;
   getPendingOrganizerVerification(): Promise<number>;
}