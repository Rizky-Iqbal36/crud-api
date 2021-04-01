import { Module } from '@nestjs/common';
import { controllers } from '@root/controllers/index';

@Module({
  imports: [],
  controllers,
  providers: [],
})
export class AppModule {}
