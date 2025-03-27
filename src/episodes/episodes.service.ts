import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity/episode.entity';
import { log } from 'console';
import { loadEnvFile } from 'process';
import { CreateEpisodeDto } from './dto/create-episode.dto/create-episode.dto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDsc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDsc);
  }

  async findFeatured() {
    return this.episodes.filter((e) => e.featured);
  }

  async findOne(id: string) {
    log(this.episodes);
    const episode = this.episodes.find((e) => e.id === id);
    return episode;
  }

  async create(createEpisodeDto: CreateEpisodeDto) { 
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);
    return newEpisode;
  }
}

function randomUUID() {
//   throw new Error('Function not implemented.');
  return '1';
}
