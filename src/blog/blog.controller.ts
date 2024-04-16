import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.schema';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async addBlog(@Body() createBlogDto: any): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
}
