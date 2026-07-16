export type FavoritosActions =
  | {type: '[Favoritos] Alternar'; id: number}
  | {type: '[Favoritos] Limipiar'}
  | {type: '[Favoritos] Cargar'; ids: number[]};

