
// Result Structure from https://developer.marvel.com/documentation/apiresults

// Stored data,
export interface DataContainer<T> {
    offset: number;         // Desplazamiento de los resultados
    limit: number;          // Límite de resultados
    total: number;          // Número total de resultados disponibles
    count: number;          // Número total de resultados devueltos en esta llamada
    results: T[];           // Lista de entidades devueltas
}

// Clase principal para la respuesta de la API
export class ApiResponse<T> {
    code: number;                     // Código de estado HTTP
    status: string;                   // Descripción del estado de la llamada
    data: DataContainer<T>;           // Contenedor de datos con resultados paginados
    etag: string;                     // Digest del contenido
    copyright: string;                // Aviso de derechos de autor
    attributionText: string;          // Texto de atribución
    attributionHTML: string;          // Atribución en formato HTML

    constructor(
        code: number,
        status: string,
        data: DataContainer<T>,
        etag: string,
        copyright: string,
        attributionText: string,
        attributionHTML: string
    ) {
        this.code = code;
        this.status = status;
        this.data = data;
        this.etag = etag;
        this.copyright = copyright;
        this.attributionText = attributionText;
        this.attributionHTML = attributionHTML;
    }
}
    
  