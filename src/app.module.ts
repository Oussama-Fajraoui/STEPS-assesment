import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';

console.log('MongoDB URI:', process.env.MONGODB_URI);

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://oussamagf:24082007g@cluster0.is9uh6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"), BlogModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
