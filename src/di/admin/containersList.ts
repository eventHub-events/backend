import { FetchUserUseCase } from "../../application/admin/fetchUsersUsecase";
import { UserListController } from "../../interface/controllers/admin/userListController";
import { userRepository } from "../container";



export const  fetchUserUseCase= new FetchUserUseCase(userRepository)
export const usersListController= new UserListController(fetchUserUseCase)