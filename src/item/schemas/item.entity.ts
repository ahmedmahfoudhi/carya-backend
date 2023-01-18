import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  city: string;

  @Prop()
  images: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: UserDocument | Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
