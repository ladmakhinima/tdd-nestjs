import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema()
export class Supplier {
  @Prop({ name: 'full_name', required: true, type: String })
  fullName: string;

  @Prop({ name: 'base_price', required: true, type: Number })
  basePrice: number;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
