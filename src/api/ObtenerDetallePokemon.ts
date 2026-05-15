import { Pokemon } from '../types/pokemon';

export const obtenerDetallePokemon = async (
    id: number | string
): Promise<Pokemon | null> => {

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const pokemon: Pokemon = await respuesta.json();

        return pokemon;

    } catch (error) {

        console.log(error);

        return null;
    }
};