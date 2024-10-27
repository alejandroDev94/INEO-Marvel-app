export class Thumbnail {
    path: string;
    extension: string;
  }
  
  export class Creator {
    resourceURI: string;
    name: string;
    role: string;
  }
  
  export class Character {
    available: number;
    collectionURI: string;
    items: any[]; // Puede ser una interfaz si tienes más detalles sobre los personajes
    returned: number;
  }
  
  export class Story {
    resourceURI: string;
    name: string;
    type: string;
  }
  
  export class Event {
    available: number;
    collectionURI: string;
    items: any[]; // Puede ser una interfaz si tienes más detalles sobre los eventos
    returned: number;
  }
  
  export class Price {
    type: string;
    price: number;
  }
  
  export class DateType {
    type: string;
    date: string;
  }
  
  export class Series {
    resourceURI: string;
    name: string;
  }
  
  export class Url {
    type: string;
    url: string;
  }
  
  export class Variant {
    resourceURI: string;
    name: string;
  }
  
  export class RestComic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    checked:boolean = false;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: any[]; // Puedes definir otra interfaz si tienes detalles sobre los objetos de texto
    resourceURI: string;
    urls: Url[];
    series: { resourceURI: string; name: string };
    variants: { resourceURI: string; name: string }[];
    collections: any[]; // Puedes definir otra interfaz si tienes detalles sobre las colecciones
    collectedIssues: any[]; // Puedes definir otra interfaz si tienes detalles sobre los números recopilados    
    prices: Price[];
    thumbnail: Thumbnail;
    images: any[]; // Puedes definir otra interfaz si tienes detalles sobre las imágenes    
    characters: Character;    
    events: Event;
  
    constructor(data: any) {
      this.id = data.id;
      this.digitalId = data.digitalId;
      this.title = data.title;
      this.issueNumber = data.issueNumber;
      this.variantDescription = data.variantDescription;
      this.description = data.description;
      this.modified = data.modified;
      this.isbn = data.isbn;
      this.upc = data.upc;
      this.diamondCode = data.diamondCode;
      this.ean = data.ean;
      this.issn = data.issn;
      this.format = data.format;
      this.pageCount = data.pageCount;
      this.textObjects = data.textObjects;
      this.resourceURI = data.resourceURI;
      this.urls = data.urls;
      this.series = data.series;
      this.variants = data.variants;
      this.collections = data.collections;
      this.collectedIssues = data.collectedIssues;
      this.prices = data.prices;
      this.thumbnail = data.thumbnail;
      this.images = data.images;
      this.characters = data.characters;      
      this.events = data.events;
    }
}
  