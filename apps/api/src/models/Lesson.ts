import mongoose, { Schema , Document} from 'mongoose'

export interface ILesson extends Document {
  lesson_content:"string",
  content_type:"string",
}

