import { computed } from "@angular/core";
import { signalStore, withState, withComputed, withMethods, patchState, type } from "@ngrx/signals";
import { FavoritoPokemon } from "../../domain/pokemon.interface";
import { withEntities, addEntities, removeEntity, setAllEntities, addEntity, updateEntity} from "@ngrx/signals/entities";

import { inject } from "@angular/core";
import { rxMethod, RxMethod } from "@ngrx/signals/rxjs-interop";
import { updateEntities } from "@ngrx/signals/entities";
import { pipe, of } from "rxjs";
import { mergeMap, tap, catchError } from "rxjs";
import { PokemonService } from "../../services/pokemon.service";

import { effect, PLATFORM_ID } from "@angular/core";
import { withHooks } from "@ngrx/signals";
import { isPlatformBrowser } from "@angular/common";

export const FavoritosNgrxStore = signalStore(
    { providedIn: 'root'},
    
    // withState({
    //     lista: [] as FavoritoPokemon[], 
    // }),
    
    withEntities({entity: type<FavoritoPokemon>() }),

    withComputed((store) => ({
        total: computed(()=> store.entities().length),
        hayFavoritos: computed(()=> store.entities().length > 0)
    })),

    // withMethods((store)=>({

    //     // esFavorito(id: number): boolean{
    //     //     return store.lista().some(p => p.id === id);
    //     // },

    //     esFavorito(id: number): boolean{
    //         return store.entityMap()[id] !== undefined;
    //     },

    //     // alternar(p: FavoritoPokemon): void {
    //     //     const yaEsta = store.lista().some(f => f.id === p.id);
            
    //     //     patchState(store, {
    //     //     lista: yaEsta
    //     //     ? store.lista().filter(f => f.id !== p.id)
    //     //     : [...store.lista(), p]
    //     //     });
          
    //     // }, withMEthods
        
    //     alternar(p: FavoritoPokemon): void {

    //         if(store.entityMap()[p.id]){
    //             patchState(store, removeEntity(p.id));
    //         }else {
    //             patchState(store, addEntity(p))
    //         }
    //     },


    //     // limpiar(): void {
    //     //     patchState(store, {lista: []})
    //     // },

    //     limpiar(): void {
    //         patchState(store, setAllEntities([] as FavoritoPokemon[]));
    //     }

    // }))

    withMethods((store, pokemonService = inject(PokemonService)) => {

        const cargarTipos = rxMethod<FavoritoPokemon>(
            pipe(
                mergeMap((favorito) =>

                    pokemonService.getPokemon(favorito.name).pipe(

                        tap((detalle) => {
                        patchState(store, updateEntity({
                        id: favorito.id,
                        changes: { types: detalle.types.map((t) => t.type.name) },
              }));
            }),

                        catchError(() => of(null)),
            )
            ),
            )
        );


        return {
            cargarTipos,
            
            esFavorito(id: number): boolean {
                return store.entityMap()[id] !== undefined;
            }, 

            alternar(p: FavoritoPokemon): void{
                if(store.entityMap()[p.id]){
                    patchState(store, removeEntity(p.id));
                }else{
                    patchState(store, addEntity(p));
                    cargarTipos(p);
                }
            },

            limpiar():void{
                patchState(store, setAllEntities([] as FavoritoPokemon[]))
            }
        }

    }),

    withHooks({

        onInit(store, platformId = inject(PLATFORM_ID)){
            if (!isPlatformBrowser(platformId)) return;

            const guardado = localStorage.getItem('pokedex.favoritos');
            if(guardado){
                const favoritos = JSON.parse(guardado) as FavoritoPokemon[];
                patchState(store, setAllEntities(favoritos));
            }

            effect(() => {
                localStorage.setItem(
                    'pokedex.favoritos',
                    JSON.stringify(store.entities())
                )
            })
        }
    })
)