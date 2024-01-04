import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConnectionUrl } from 'src/utils/constants';

@Global()
@Module({
  imports: [MongooseModule.forRoot(MongoConnectionUrl)],
})
export class MongoDBModule {}
