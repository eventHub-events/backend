import { z } from "zod";
import { KycStatus } from "../../../db/models/UserModel";


export const verificationRequestDataSchema = z.object({
  kycStatus : z.enum(
    Object.values(KycStatus) as [string, ...string[]],
    {
    message : "Invalid KYC status"
  })
})

export type VerificationRequestDataSchemaType = z.infer< typeof verificationRequestDataSchema>