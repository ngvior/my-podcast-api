import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiKeyGuard } from '../guards/api.key/api.key.guard';
import { ConfigService } from '../config/config.service';
import { CreateEpisodeDto } from './dto/create-episode.dto/create-episode.dto';
import { EpisodesService } from './episodes.service';
import { IsPositvePipe } from './pipes/is-positve/is-positve.pipe';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositvePipe)
    limit: number,
  ) {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    const ep = await this.episodesService.findOne(id);
    if (!ep) {
      // throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException('Episode not found');
    }
    return ep;
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  createEpisode(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
