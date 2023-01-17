import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ItemDocument= Item & Document ;

@Schema({timestamps:true})
export class Item {
@Prop({required:true})
Price:string;

@Prop({required:true})
City:string;

@Prop()
Images:string[];

@Prop({required:true})
Description:string;

}

export const ItemSchema=SchemaFactory.createForClass(Item)