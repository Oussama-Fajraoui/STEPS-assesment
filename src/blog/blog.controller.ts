import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Adjust this path if necessary
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogService } from './blog.service';
import { Blog } from './blog.schema';

@UseGuards(JwtAuthGuard)
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
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
      return this.blogService.findOne(id);
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
