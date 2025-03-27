import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { log } from 'console';
import { EpisodesService } from './episodes.service';
import { ConfigService } from 'src/config/config.service';
import { CreateEpisodeDto } from './dto/create-episode.dto/create-episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query() sort: 'asc' | 'desc' = 'desc') {
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
      throw new NotFoundException('Episode not found');
    }
    return ep;
  }

  @Post()
  createEpisode(@Body() input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
