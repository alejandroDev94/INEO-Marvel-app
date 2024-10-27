export interface Url {
  type: string;
  url: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ComicItem {
  resourceURI: string;
  name: string;
}

export interface Comics {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicItem[];
}

export interface StoryItem {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Stories {
  available: number;
  returned: number;
  collectionURI: string;
  items: StoryItem[];
}

export interface SeriesItem {
  resourceURI: string;
  name: string;
}

export interface Series {
  available: number;
  returned: number;
  collectionURI: string;
  items: SeriesItem[];
}

export interface CharacterItem {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Characters {
  available: number;
  returned: number;
  collectionURI: string;
  items: CharacterItem[];
}

export interface CreatorItem {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Creators {
  available: number;
  returned: number;
  collectionURI: string;
  items: CreatorItem[];
}

export interface NextOrPrevious {
  resourceURI: string;
  name: string;
}

export class RestEvent {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  checked:boolean = false;
  urls: Url[];
  modified: Date;
  start: Date;
  end: Date;
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  series: Series;
  characters: Characters;
  creators: Creators;
  next?: NextOrPrevious;
  previous?: NextOrPrevious;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.resourceURI = data.resourceURI;
    this.urls = data.urls || [];
    this.modified = new Date(data.modified);
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.thumbnail = data.thumbnail;
    this.comics = data.comics;
    this.stories = data.stories;
    this.series = data.series;
    this.characters = data.characters;
    this.creators = data.creators;
    this.next = data.next || null;
    this.previous = data.previous || null;
  }
}
