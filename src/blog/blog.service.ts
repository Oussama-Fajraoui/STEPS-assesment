import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.schema';
import { UpdateBlogDto } from './dto/update-blog.dto'; 

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

  async update(id: string, blogData: UpdateBlogDto): Promise<Blog> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(id, blogData, { new: true }).exec();
    if (!updatedBlog) {
      throw new Error('Blog not found');
    }
    return updatedBlog;
  }

  async delete(id: string): Promise<any> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new Error('Blog not found');
    }
    return deletedBlog;
  }
}
