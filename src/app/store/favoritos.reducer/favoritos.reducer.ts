import { FavoritosActions } from "../favoritos.actions/favoritos.actions";

export interface FavoritosState{
  ids: number[];
  ultimaAccion: string;
}

export const estadoInicial: FavoritosState ={
  ids: [],
  ultimaAccion: '(ninguna)',
};

export function favoritosReducer(
  estado: FavoritosState,
  accion: FavoritosActions
): FavoritosState{

  switch (accion.type){
    case '[Favoritos] Alternar': {
      const yaEsta = estado.ids.includes(accion.id);

      const ids = yaEsta
      ? estado.ids.filter(id => id !== accion.id)
      : [...estado.ids, accion.id];

      return { ...estado, ids, ultimaAccion: accion.type};
    }

    case '[Favoritos] Limipiar':
      return { ...estado, ids: [], ultimaAccion: accion.type};
    
    case '[Favoritos] Cargar':
      return { ...estado, ids: accion.ids, ultimaAccion: accion.type};

    default:
      return estado;
  }
}