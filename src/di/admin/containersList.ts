
import {  UserManagementUseCase } from "../../application/admin/UserManagementUsecase";

import { UserListController } from "../../interface/controllers/admin/userListController";
import { userRepository } from "../container";




export const  userManagementUseCase= new UserManagementUseCase(userRepository)

export const usersListController= new UserListController(userManagementUseCase)
