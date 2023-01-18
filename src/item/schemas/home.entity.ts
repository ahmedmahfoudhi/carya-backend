import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Item } from 'src/item/schemas/item.entity';

export type HomeDocument = HydratedDocument<Home>;

@Schema()
export class Home extends Item {
  @Prop({ required: true })
  rooms: number;

  @Prop()
  furnitured: boolean;

  @Prop()
  category: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
