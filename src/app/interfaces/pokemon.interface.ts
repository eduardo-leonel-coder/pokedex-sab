// Interfaz principal de un Pokémon
export interface PokemonInterface {
  id:     number;
  name:   string;
  height: number;      
  weight: number;     
  base_experience: number;
  sprites: {
    front_default: string;  
    other: {
      'official-artwork': {
        front_default: string;   
      };
    };
  };
  types:  PokemonType[];  
  stats:  PokemonStat[];    
  abilities: PokemonAbility[];
}


export interface PokemonType {
  slot: number;
  type: {
    name: string;   
    url:  string;
  };
}


export interface PokemonStat {
  base_stat: number;
  effort:    number;
  stat: {
    name: string;   
    url:  string;
  };
}

// Habilidad
export interface PokemonAbility {
  ability: { name: string; url: string; };
  is_hidden: boolean;
}


export interface PokemonListResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  PokemonListItem[];
}


export interface PokemonListItem {
  name: string;
  url:  string;
}

export interface FavoritoPokemon {
  id: number; 
  name: string; 
  spriteUrl: string; 
  types?: string[]; // esta dato, llega despues en otra peticion.
}
