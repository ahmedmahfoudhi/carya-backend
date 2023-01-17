import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Item } from "src/shared/item.entity";


export type CarDocument= Car & Document;

@Schema()
export class Car extends Item {

@Prop({required:true})
Modele:string;

@Prop({required:true})
Marque:string;

@Prop()
Mileage:number;

@Prop()
Seats:number;

@Prop()
Fuel:string;

@Prop()
Transmision:string;

}

export const CarSchema=SchemaFactory.createForClass(Car)
