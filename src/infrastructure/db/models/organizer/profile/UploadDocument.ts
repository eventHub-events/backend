import mongoose,{Document as MongooseDocument, Schema} from "mongoose"; 
import { DocumentStatus } from "../../../../../domain/enums/organizer/documentStatus";


export interface IUploadDocument extends MongooseDocument{
  organizerId:string;
  fileName:string;  
  type:string;
  url:string;
  uploadedAt:Date;
  status:DocumentStatus;
   verified: boolean;
  reviewedBy?:string;
  reviewedAt?:Date;
  reason?:string;
  current :boolean;


}

const DocumentSchema:Schema= new Schema({
organizerId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
},
fileName:{
  type:String
},
type:{
  type:String

},

url:{
  type:String
},
  uploadedAt: { type: Date, default: Date.now },
status:{
  type:String,
  enum:DocumentStatus,
  default:"Pending"
},
verified:{
   type:Boolean,
   default:false
},
current : {
  type : Boolean,
  default : false

},
reviewedBy: { type: String, default: null },
  reviewedAt: { type: Date, default: null },
  reason: { type: String, default: '' }
},{timestamps:true})


export default mongoose.model<IUploadDocument>("UploadDocument",DocumentSchema)