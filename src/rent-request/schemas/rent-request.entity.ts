import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Item, ItemDocument } from 'src/item/schemas/item.entity';
import { User, UserDocument } from 'src/user/schemas/user.schema';

export type RentRequestDocument = HydratedDocument<RentRequest>;

@Schema({ timestamps: true })
export class RentRequest {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId | UserDocument;

  @Prop({ type: Types.ObjectId, ref: Item.name })
  item: Types.ObjectId | ItemDocument;

  @Prop()
  phoneNumber: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  message: string;
}

export const RentRequestSchema = SchemaFactory.createForClass(RentRequest);
