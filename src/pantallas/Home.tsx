import { useEffect, useState } from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';

import { obtenerPokemons } from '../api/ObtenerPokemon';
import { Pokemon } from '../types/pokemon';

export default function HomeScreen() {

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

                    <View style={styles.card}>

                        <Image
                            source={{
                                uri: item.sprites.front_default,
                            }}
                            style={styles.imagen}
                        />

                        <View style={styles.infoContainer}>

                            <Text style={styles.nombre}>
                                {item.name}
                            </Text>

                            <Text style={styles.texto}>
                                ID: {item.id}
                            </Text>

                            <Text style={styles.texto}>
                                Tipo: {item.types[0].type.name}
                            </Text>

                            <Text style={styles.texto}>
                                Peso: {item.weight}
                            </Text>

                            <Text style={styles.texto}>
                                Altura: {item.height}
                            </Text>

                        </View>

                    </View>
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