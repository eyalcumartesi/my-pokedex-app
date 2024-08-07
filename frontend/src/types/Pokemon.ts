export interface Pokemon {
	id: string | number;
	name: string;
	height: number;
	weight: number;
	base_experience: number;
	types: Array<PokemonType>;
	abilities: Array<PokemonAbility>;
	stats: Array<PokemonStat>;
	sprites: PokemonSprites;
	pokemon_id: string;
	isFavorite?: boolean;
}

export interface PokemonType {
	slot: number;
	type: NamedAPIResource;
}

export interface PokemonAbility {
	is_hidden: boolean;
	slot: number;
	ability: NamedAPIResource;
}

export interface PokemonStat {
	base_stat: number;
	effort: number;
	stat: NamedAPIResource;
}

export interface PokemonSprites {
	front_default: string;
	front_shiny: string;
	front_female: string | null;
	front_shiny_female: string | null;
	back_default: string;
	back_shiny: string;
	back_female: string | null;
	back_shiny_female: string | null;
}

export interface NamedAPIResource {
	name: string;
	url: string;
}
