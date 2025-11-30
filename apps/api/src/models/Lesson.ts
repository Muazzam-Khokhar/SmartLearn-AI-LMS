import mongoose, { Document , Schema} from "mongoose";

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  title:"string";
  content?:"string";
  contentType: "text" | "video" | "resource" | "audio";
  resourceUrl: "string";
  order?: number;
  duration?: number;
  createdBy: mongoose.Types.ObjectId;
  published:boolean;
}

const LessonSchema = new Schema<ILesson>(
  {
    courseId: {type:Schema.Types.ObjectId,ref:"Course",required:true},
    title: {type:String,required:true},
    content: {type:String},
    contentType:{type:String,enum: ["text","video","resource","audio"],required:true},
    resourceUrl:{type:String,required:true},
    order:{type:Number},
    duration:{type:Number},
    createdBy:{type:Schema.Types.ObjectId,ref:"User",required:true},
    published:{type:Boolean,required:true}
  },
  {timestamps:true}
)

export default mongoose.model<ILesson>("Lesson",LessonSchema);
