import mongoose,{Document as MongooseDocument, Schema} from "mongoose"; 


export interface UploadDocument extends MongooseDocument{
  organizerId:string;
  type:string;
  url:string;
  uploadedAt:Date;
  status:"Pending" | " Approved" |"rejected";
  reviewedBy?:string;
  reviewedAt?:Date;
  reason?:string;


}

const DocumentSchema:Schema= new Schema({
organizerId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
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
  enum:["Pending","Approved","Rejected"],
  default:"Pending"
},
reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
  reviewedAt: { type: Date, default: null },
  reason: { type: String, default: '' }
},{timestamps:true})


export default mongoose.model<UploadDocument>("UploadDocument",DocumentSchema)