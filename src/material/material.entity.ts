import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Supplier } from './supplier/supplier.entity';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  @Prop({ name: 'name', type: String, required: true })
  name: string;

  @Prop({ name: 'category', type: String, required: true })
  category: string;

  @Prop({ name: 'suppliers', type: [Supplier], required: true })
  suppliers: Supplier[];

  @Prop(
    raw({
      name: {
        type: String,
        name: 'name',
        required: true,
      },
      symbol: {
        type: String,
        name: 'symbol',
        required: true,
      },
    }),
  )
  unitOfMeasurement: Record<string, string>;

  @Prop({ name: 'stock', type: Number, required: true })
  stock: number;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
