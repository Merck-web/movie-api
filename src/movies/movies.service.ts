import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { Movie } from './movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOneById(id: string): Promise<Movie> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Movie not found1');
    }

    return this.movieModel.findById(id).exec();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, description, rating } = createMovieDto;
    const movieData = {
      title,
      description,
      rating
    };
    const movie = new this.movieModel(movieData);
    return movie.save();
  }

  async update(movie: Movie): Promise<Movie> {
    return movie.save();
  }

  async delete(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
