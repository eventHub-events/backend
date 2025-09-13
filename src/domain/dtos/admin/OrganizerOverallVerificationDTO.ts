import {z} from "zod";

 type KycStatus = "Pending" | "Approved" | "Rejected";


  const  UpdateOrganizerOverallVerificationStatusSchema = z.object({
  user: z.object({
    kycStatus: z.enum(["Pending", "Approved", "Rejected"]), 
    isVerified: z.boolean(),
  }),
  profile: z.object({
    kycVerified: z.boolean(),
  })
})

     export type UpdateOrganizerOverallVerificationStatusDTOInput = z.infer<typeof UpdateOrganizerOverallVerificationStatusSchema>;
export class UpdateOrganizerOverallVerificationStatusDTO{
 
  user: {
    kycStatus: KycStatus;
    isVerified: boolean;
  };

  profile: {
    kycVerified: boolean;
  };

  private constructor(data: UpdateOrganizerOverallVerificationStatusDTOInput ){
    
     this.user = data.user;
     this.profile = data.profile;
  } 
  static create(data: unknown): UpdateOrganizerOverallVerificationStatusDTO{
    
const parsed = UpdateOrganizerOverallVerificationStatusSchema.safeParse(data)

if(!parsed.success){
   throw parsed.error
   
}
return new UpdateOrganizerOverallVerificationStatusDTO(parsed.data);
  
}
}
