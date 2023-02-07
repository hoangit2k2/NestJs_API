import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    request: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

export interface Product extends mongoose.Document {
  id: String;
  title: String;
  description: String;
  price: number;
}
