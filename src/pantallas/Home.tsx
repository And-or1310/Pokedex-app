import { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';
import PokemonCard from '../componentes/PokemonCard';

import { useNavigation } from '@react-navigation/native';

import { obtenerPokemons } from '../api/ObtenerPokemon';
import { Pokemon } from '../types/pokemon';

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarPokemons();
    }, []);

    const cargarPokemons = async () => {

        const datos = await obtenerPokemons();

        setPokemons(datos);

        setCargando(false);
    };

    if (cargando) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
                <Text>Cargando Pokémon...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Pokédex
            </Text>

            <FlatList
                data={pokemons}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                renderItem={({ item }) => (

                    <PokemonCard
                        pokemon={item}
                        onPress={() =>
                            navigation.navigate(
                                'DetallePokemon',
                                {
                                    pokemonId: item.id,
                                }
                            )
                        }
                    />
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
        paddingHorizontal: 15,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: 'white',

        padding: 15,

        marginBottom: 15,

        borderRadius: 15,

        elevation: 4,
    },

    imagen: {
        width: 100,
        height: 100,
    },

    infoContainer: {
        flex: 1,
        marginLeft: 15,
    },

    nombre: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 5,
    },

    texto: {
        fontSize: 16,
        marginBottom: 2,
        textTransform: 'capitalize',
    },
});