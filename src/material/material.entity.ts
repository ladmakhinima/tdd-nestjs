import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  @Prop({ name: 'name', type: String, required: true })
  name: string;

  @Prop({ name: 'category', type: String, required: true })
  category: string;

  @Prop([
    raw({
      name: {
        type: String,
        name: 'fullName',
        required: true,
      },
      basePrice: {
        type: Number,
        name: 'basePrice',
        required: true,
      },
    }),
  ])
  suppliers: Record<string, number>[];

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
