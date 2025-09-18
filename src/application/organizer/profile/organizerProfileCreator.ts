import { IProfileCreator } from "../../interface/common/IProfileCreator";
import { IOrganizerBlankProfileCreationUseCase } from "../../interface/organizer/IOrganizerBlankProfileCreationUseCase";

export class  OrganizerProfileCreator implements IProfileCreator {
constructor(
  private _organizerBlankProfileUseCase: IOrganizerBlankProfileCreationUseCase
){}
async createProfile(userId: string): Promise<void> {
     await this._organizerBlankProfileUseCase.createBlankProfile(userId)
}
}