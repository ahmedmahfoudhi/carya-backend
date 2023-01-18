import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Item } from 'src/item/schemas/item.entity';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car extends Item {
  @Prop({ required: true })
  modele: string;

  @Prop({ required: true })
  marque: string;

  @Prop()
  mileage: number;

  @Prop()
  seats: number;

  @Prop()
  fuel: string;

  @Prop()
  transmision: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.pre('find', function (next) {
  this.populate('user');
  next();
});

CarSchema.pre('findOne', function (next) {
  this.populate('user');
  next();
});
