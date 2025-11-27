import mongoose, { Document, Schema} from "mongoose";
export interface ICourse extends Document {
  title: "string";
  description: "string";
  category: "string";
  createdBy: mongoose.Types.ObjectId;
  published: boolean;
  thumbnail?: "string";
}

const courseSchema = new Schema<ICourse>({
  title:{type:String, required:true},
  description: {type:String,required:true},
  category: {type:String,required:true},
  thumbnail: { type: String },
  published: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
},{timestamps:true})

export default mongoose.model<ICourse>("Course",courseSchema)
