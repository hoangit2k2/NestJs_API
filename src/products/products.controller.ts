import { Controller, Post, Get, Patch,  Body, Param, Delete } from '@nestjs/common';
import { title } from 'process';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}
  @Post()
  addProduct(
    @Body('title') prodTitle: String,
    @Body('description') prodDesc: String,
    @Body('price') prodPrice: number) {
    const generateId = this.productsService.insertProduct(prodTitle,prodDesc,prodPrice)
        return {id: generateId}
  }

  @Get()
  findAllProducts(){
    return this.productsService.getProducts()
  }

  @Get(':id')
  findProduct(@Param('id') prodId: String){
    return this.productsService.getProductById(prodId)
  }

  @Patch(':id')
  updateProduct(@Param('id') prodId: String,
    @Body('title') prodTitle: String,
    @Body('description') prodDest: String,
    @Body('price') prodPrice: number,
  )
  {
     this.productsService.updateProductId(prodId, prodTitle, prodDest, prodPrice)
     return null;
  }
  @Delete(':id')
  deleteProduct(@Param('id') prodId: String){
    this.productsService.deleteProduct(prodId);
    return null
  }
}
