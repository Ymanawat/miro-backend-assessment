import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import mongoose from 'mongoose';

@Schema({ collection: 'notes', timestamps: true })
export class Note extends BaseSchema {
  @Prop({ required: true, index: 'text' })
  title: string;

  @Prop({ required: true, index: 'text' })
  content: string;

  @Prop({ required: true, type: [mongoose.Types.ObjectId] })
  adminUserIds: mongoose.Types.ObjectId[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.index({ adminUserIds: 1 });
