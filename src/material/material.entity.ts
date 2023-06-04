import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  MaterialSupplier,
  MaterialSupplierSchema,
} from './material-supplier.entity';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  _id: string;

  @Prop({ name: 'name', type: String, required: true })
  name: string;

  @Prop({ name: 'category', type: String, required: true })
  category: string;

  @Prop({ name: 'suppliers', required: true, type: [MaterialSupplierSchema] })
  suppliers: MaterialSupplier[];

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
