import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Item } from "src/shared/item.entity";


export type HomeDocument= Home & Document;

@Schema()
export class Home extends Item {

@Prop({required:true})
Rooms:number;

@Prop()
Furnitured:string;

@Prop()
Category:string;

}

export const HomeSchema=SchemaFactory.createForClass(Home)
