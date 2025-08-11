import { UserResponseDTO } from "../../../domain/dtos/user/UserResponseDTO";
import { IUsersDocument } from "../../../infrastructure/interface/IUsersDocument";

export interface IFetchUserUseCase{
  fetchUsers():Promise<Omit<UserResponseDTO, "phone" | "password">[]|null>
}