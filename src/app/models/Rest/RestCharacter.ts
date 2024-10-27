import { Filter } from "../Filter";

// Clase principal para Character
export class RestCharacter {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: ComicData;
    series: SeriesData;
    stories: StoryData;
    events: EventData;
    urls: URL[];
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.modified = data.modified;
      this.thumbnail = new Thumbnail(data.thumbnail);
      this.resourceURI = data.resourceURI;
      this.comics = new ComicData(data.comics);
      this.series = new SeriesData(data.series);
      this.stories = new StoryData(data.stories);
      this.events = new EventData(data.events);
      this.urls = data.urls.map((url: any) => new URL(url));
    }


    getComitsNameCode(): Filter[] {
        const comicItem:Filter[]=[];
        this.comics.items.forEach(item => {
            var itemAux:Filter;
            itemAux.name = item.name;
            itemAux.id = item.resourceURI.split('/').pop();
            comicItem.push(itemAux);
        })
        return comicItem;
    }

    getEventsNameCode(): Filter[] {
        const eventItem:Filter[]=[];
        this.events.items.forEach(item => {
            var itemAux:Filter;
            itemAux.name = item.name;
            itemAux.id = item.resourceURI.split('/').pop();
            eventItem.push(itemAux);
        })
        return eventItem;
    }

  }
  
  // Clase para Thumbnail
  export class Thumbnail {
    path: string;
    extension: string;
  
    constructor(data: any) {
      this.path = data.path;
      this.extension = data.extension;
    }
  }
  
  // Clase para datos de Comics
  export class ComicData {
    available: number;
    collectionURI: string;
    items: ComicItem[];
    returned: number;
  
    constructor(data: any) {
      this.available = data.available;
      this.collectionURI = data.collectionURI;
      this.items = data.items.map((item: any) => new ComicItem(item));
      this.returned = data.returned;
    }
  }
  
  // Clase para cada item en Comics
  export class ComicItem {
    resourceURI: string;
    name: string;
  
    constructor(data?: any) {
      this.resourceURI = data.resourceURI;
      this.name = data.name;
    }
  }
  
  // Clase para datos de Series
  export class SeriesData {
    available: number;
    collectionURI: string;
    items: SeriesItem[];
    returned: number;
  
    constructor(data: any) {
      this.available = data.available;
      this.collectionURI = data.collectionURI;
      this.items = data.items.map((item: any) => new SeriesItem(item));
      this.returned = data.returned;
    }
  }
  
  // Clase para cada item en Series
  export class SeriesItem {
    resourceURI: string;
    name: string;
  
    constructor(data: any) {
      this.resourceURI = data.resourceURI;
      this.name = data.name;
    }
  }
  
  // Clase para datos de Stories
  export class StoryData {
    available: number;
    collectionURI: string;
    items: StoryItem[];
    returned: number;
  
    constructor(data: any) {
      this.available = data.available;
      this.collectionURI = data.collectionURI;
      this.items = data.items.map((item: any) => new StoryItem(item));
      this.returned = data.returned;
    }
  }
  
  // Clase para cada item en Stories
  export class StoryItem {
    resourceURI: string;
    name: string;
    type: string;
  
    constructor(data: any) {
      this.resourceURI = data.resourceURI;
      this.name = data.name;
      this.type = data.type;
    }
  }
  
  // Clase para datos de Events
  export class EventData {
    available: number;
    collectionURI: string;
    items: EventItem[];
    returned: number;
  
    constructor(data: any) {
      this.available = data.available;
      this.collectionURI = data.collectionURI;
      this.items = data.items.map((item: any) => new EventItem(item));
      this.returned = data.returned;
    }
  }
  
  // Clase para cada item en Events
  export class EventItem {
    resourceURI: string;
    name: string;
  
    constructor(data: any) {
      this.resourceURI = data.resourceURI;
      this.name = data.name;
    }
  }
  
  // Clase para URLs
  export class URL {
    type: string;
    url: string;
  
    constructor(data: any) {
      this.type = data.type;
      this.url = data.url;
    }
  }
  