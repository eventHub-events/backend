import { z } from "zod";
import { DocumentStatus } from "../../../../domain/enums/organizer/documentStatus";
export const documentTypes = ["AadharCard", "PANCard", "BusinessCertificate"] as const;

const allowedExtensions = ["jpg", "jpeg", "png"];


export const organizerUploadDocumentSchema = z.object({
  name: z
    .string()
    .min(2, "Document file name must be at least 2 characters")
    .refine((val) => {
      const ext = val.split(".").pop()?.toLowerCase();
      return ext && allowedExtensions.includes(ext);
    }, {
      message: "Only image files (jpg, jpeg, png) are allowed",
    }),

  url: z
    .string()
    .min(1,"URL is required")
    .url()
    .refine((val) => val.includes("cloudinary"),{
      message : "Must be a valid Cloudinary URL" ,
    }) ,

    type: z
        .enum(documentTypes,{
          message:"Invalid Document type"
        })
    ,
    organizerId: z
      .string()
      .min(1,"organizerId is required"),

     status: z
      .enum(DocumentStatus,{
        message :"Invalid Document status"
      })
      .optional()


    })
    export type organizerUploadDocumentSchemaType        =  z.infer<typeof organizerUploadDocumentSchema >;
    export const organizerUploadDocumentUpdateSchema     =  organizerUploadDocumentSchema.partial();
    export type  organizerUploadDocumentUpdateSchemaType = z.infer< typeof organizerUploadDocumentUpdateSchema >;

