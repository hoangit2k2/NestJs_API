import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.module';
import { Model, Mongoose } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productMode: Model<Product>,
  ) {}

  async insertProduct(title: String, desc: String, price: number) {
    const newProduct = new this.productMode({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }
  async getProducts() {
    const products = await this.productMode.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }
  async getProductById(productId: String) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }
  async updateProductId(
    productId: String,
    title: String,
    desc: String,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    return updateProduct.save();
  }

  async deleteProduct(productId: String) {
    await this.findProduct(productId);
    await this.productMode.deleteOne({ id: productId }).exec();
  }

  private async findProduct(id: String): Promise<Product> {
    let product;
    try {
      product = await this.productMode.findById(id);
    } catch (error) {
      throw new NotFoundException('ProductId not found !');
    }
    if (!product) {
      throw new NotFoundException('ProductId not found !');
    }
    return product;
  }
}
