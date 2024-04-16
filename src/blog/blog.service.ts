import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: any): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }
  async update(id: string, blogData: Blog): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, blogData, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.blogModel.findByIdAndRemove(id).exec();
  }
}
