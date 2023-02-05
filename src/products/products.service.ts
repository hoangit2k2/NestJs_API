import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.module';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: String, desc: String, price: number) {
    // return Math.floor(Math.random() * Math.floor(max));
    const productId = Math.floor(Math.random() * Math.floor(1000)).toString()
    // Math.random().toString();
    const newProduct = new Product(productId, title, desc, price);
    this.products.push(newProduct);
    return productId;
  }
  getProducts() {
    return [...this.products];
  }
  getProductById(productId: String) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }
  updateProductId(
    productId: String,
    title: String,
    desc: String,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.Price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(productId: String ){
    const index = this.findProduct(productId)[1]
    this.products.splice(index,1)
  }

  findProduct(id: String): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id == id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('ProductId not found !');
    }
    return [product, productIndex];
  }
}
