import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {Movie} from './movie.schema';
import {CreateMovieDto} from './dto/create-movie.dto';
import {UpdateMovieDto} from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    const movie = await this.moviesService.findOneById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found1');
    }

    return movie;
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesService.findOneById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    movie.title = updateMovieDto.title || movie.title;
    movie.description = updateMovieDto.description || movie.description;

    return this.moviesService.update(movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.delete(id);
  }
}
