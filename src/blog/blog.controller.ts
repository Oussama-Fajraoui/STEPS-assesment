import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './dtos';
import { BlogService } from './blog.service';
import { Blog } from './blog.schema';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async addBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string): Promise<any> {
    return this.blogService.delete(id);
  }
}
