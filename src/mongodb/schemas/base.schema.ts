import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class BaseSchema extends mongoose.Document {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: Date }) createdAt: Date;
  @Prop({ type: Date }) updatedAt: Date;
}
