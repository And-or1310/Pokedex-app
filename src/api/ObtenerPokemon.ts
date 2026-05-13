import { Pokemon } from '../types/pokemon';

export const obtenerPokemons = async (): Promise<Pokemon[]> => {
    try {
        const respuesta = await fetch(
            'https://pokeapi.co/api/v2/pokemon?limit=20'
        );

        const datos = await respuesta.json();

        const listaPokemons: Pokemon[] = [];

        for (const item of datos.results) {

            const detalle = await fetch(item.url);
            const pokemon: Pokemon = await detalle.json();

            listaPokemons.push(pokemon);
        }

        return listaPokemons;

    } catch (error) {
        console.log('Error al obtener Pokémon:', error);
        return [];
    }
};