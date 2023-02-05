import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
