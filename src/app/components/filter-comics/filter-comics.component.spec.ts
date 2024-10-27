// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { beforeEach, describe, it } from 'node:test';
// import 'jasmine';



// import { of, BehaviorSubject } from 'rxjs';
// import { filterComicsComponent } from './filter-comics.component';
// import { ComicsService } from '../../services/api-marvel/Comic.service';
// import { FilterService } from '../../services/Utils/Filter.service';
// import { RestComic } from '../../models/Rest/RestComic';
// import { ApiResponse } from '../../models/Rest/ApiResponse';

// describe('FilterComicsComponent', () => {
//   let component: filterComicsComponent;
//   let fixture: ComponentFixture<filterComicsComponent>;
//   let comicServiceSpy: jasmine.SpyObj<ComicsService>;
//   let filterServiceSpy: jasmine.SpyObj<FilterService>;

//   beforeEach(() => {
//     const comicsServiceMock = jasmine.createSpyObj('ComicsService', ['getAllComics', 'comicUncheck$']);
//     const filterServiceMock = jasmine.createSpyObj('FilterService', ['setCommicsToFilter']);

//     TestBed.configureTestingModule({
//       declarations: [filterComicsComponent],
//       providers: [
//         { provide: ComicsService, useValue: comicsServiceMock },
//         { provide: FilterService, useValue: filterServiceMock },
//       ]
//     });

//     fixture = TestBed.createComponent(filterComicsComponent);
//     component = fixture.componentInstance;

//     comicServiceSpy = TestBed.inject(ComicsService) as jasmine.SpyObj<ComicsService>;
//     filterServiceSpy = TestBed.inject(FilterService) as jasmine.SpyObj<FilterService>;

//     // Mocking observables for tests
//     comicServiceSpy.comicUncheck$ = new BehaviorSubject<boolean>(false);
//   });

//   it('debe crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debe concatenar nuevos comics en "comics" cuando searchSubject emite un valor', () => {
//     // Mock de respuesta de getAllComics
//     const comicsMock: ApiResponse<RestComic> = { id: 2, title: 'Comic 2' };
//     comicServiceSpy.getAllComics.and.returnValue(of(comicsMock}));

//     component.searchSubject.next(true); // Simulamos la búsqueda

//     // Verificamos si los resultados se han concatenado correctamente
//     component.searchSubject.subscribe(() => {
//       expect(component.comics.length).toBe(2);
//       expect(component.comics).toEqual(jasmine.arrayContaining(comicsMock));
//     });
//   });

//   it('debe resetear los comics no seleccionados cuando comicUncheck$ emite un valor', () => {
//     // Establecemos algunos comics con `checked` en true
//     component.comics = [
//       { id: 1, title: 'Comic 1', checked: true } as RestComic,
//       { id: 2, title: 'Comic 2', checked: true } as RestComic
//     ];

//     comicServiceSpy.comicUnchecksSubject$.next(true); // Emitimos el evento

//     component.comicServic.comicUncheck$.subscribe(() => {
//       component.comics.forEach(comic => {
//         expect(comic.checked).toBeFalse();
//       });
//     });
//   });

//   it('debe filtrar y mantener solo los comics seleccionados en borrado()', () => {
//     // Creamos un mock de comics con algunos `checked` en true y otros en false
//     component.comics = [
//       { id: 1, title: 'Comic 1', checked: true } as RestComic,
//       { id: 2, title: 'Comic 2', checked: false } as RestComic,
//       { id: 3, title: 'Comic 3', checked: true } as RestComic
//     ];

//     component.borrado(''); // Simulamos la llamada a borrado con el valor en blanco

//     expect(component.comics.length).toBe(2); // Solo dos comics tienen checked en true
//     component.comics.forEach(comic => {
//       expect(comic.checked).toBeTrue();
//     });
//   });

//   it('debe reiniciar la página del filtro y emitir un valor en searchSubject en searchByName()', () => {
//     spyOn(component.filter, 'resetIndex'); // Espiamos el método resetIndex para verificar su llamado

//     component.searchByName(); // Llamamos a la función

//     expect(component.filter.resetIndex).toHaveBeenCalled();
//     component.searchSubject.subscribe((value) => {
//       expect(value).toBeFalse();
//     });
//   });

//   it('debe llamar a nextPage y emitir un valor en searchSubject en seeMore()', () => {
//     spyOn(component.filter, 'nextPage'); // Espiamos el método nextPage para verificar su llamado

//     component.seeMore(); // Llamamos a la función

//     expect(component.filter.nextPage).toHaveBeenCalled();
//     component.searchSubject.subscribe((value) => {
//       expect(value).toBeFalse();
//     });
//   });

//   it('debe llamar a setCommicsToFilter en el servicio FilterService en submit()', () => {
//     // Configuramos algunos comics como seleccionados
//     component.comics = [
//       { id: 1, title: 'Comic 1', checked: true } as RestComic,
//       { id: 2, title: 'Comic 2', checked: false } as RestComic,
//       { id: 3, title: 'Comic 3', checked: true } as RestComic
//     ];

//     component.submit(); // Llamamos a la función submit

//     // Verificamos que setCommicsToFilter fue llamado con los IDs de los comics seleccionados
//     expect(filterServiceSpy.setCommicsToFilter).toHaveBeenCalledWith(['1', '3']);
//   });
// });
