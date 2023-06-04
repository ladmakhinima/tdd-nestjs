import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MaterialSupplier {
  @Prop({ name: 'fullName', type: String, required: true })
  fullName: string;

  @Prop({ name: 'basePrice', type: Number, required: true })
  basePrice: number;
}

export const MaterialSupplierSchema =
  SchemaFactory.createForClass(MaterialSupplier);
