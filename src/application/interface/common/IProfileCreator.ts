

//--------------> it is the common interface for profile creation 

export interface IProfileCreator {
  createProfile(userId: string): Promise<void>;

}