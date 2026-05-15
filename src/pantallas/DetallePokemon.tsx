import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';

import { useEffect, useState } from 'react';

import { obtenerDetallePokemon } from '../api/ObtenerDetallePokemon';

import { Pokemon } from '../types/pokemon';

export default function DetallePokemon({
    route,
}: any) {

    const { pokemonId } = route.params;

    const [pokemon, setPokemon] =
        useState<Pokemon | null>(null);

    const [cargando, setCargando] =
        useState(true);

    useEffect(() => {

        cargarPokemon();

    }, []);

    const cargarPokemon = async () => {

        const data =
            await obtenerDetallePokemon(
                pokemonId
            );

        setPokemon(data);

        setCargando(false);
    };

    if (cargando || !pokemon) {

        return (

            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >

            <Image
                source={{
                    uri: pokemon.sprites.front_default,
                }}
                style={styles.imagen}
            />

            <Text style={styles.nombre}>
                {pokemon.name}
            </Text>

            <View style={styles.card}>

                <Text style={styles.texto}>
                    Peso: {pokemon.weight}
                </Text>

                <Text style={styles.texto}>
                    Altura: {pokemon.height}
                </Text>

            </View>

            <View style={styles.card}>

                <Text style={styles.subtitulo}>
                    Tipos
                </Text>

                {
                    pokemon.types.map((item) => (

                        <View
                            key={item.slot}
                            style={styles.tipoBadge}
                        >

                            <Text style={styles.tipoTexto}>
                                {item.type.name}
                            </Text>

                        </View>
                    ))
                }

            </View>

            <View style={styles.card}>

                <Text style={styles.subtitulo}>
                    Estadísticas
                </Text>

                {
                    pokemon.stats.map((item, index) => (

                        <View
                            key={index}
                            style={styles.statContainer}
                        >

                            <View style={styles.statHeader}>

                                <Text style={styles.statNombre}>
                                    {item.stat.name}
                                </Text>

                                <Text style={styles.statValor}>
                                    {item.base_stat}
                                </Text>

                            </View>

                            <View style={styles.barraFondo}>

                                <View
                                    style={[
                                        styles.barraProgreso,
                                        {
                                            width: `${Math.min(
                                                item.base_stat,
                                                100
                                            )}%`,
                                        },
                                    ]}
                                />

                            </View>

                        </View>
                    ))
                }

            </View>

            <View style={styles.card}>

                <Text style={styles.subtitulo}>
                    Habilidades
                </Text>

                {
                    pokemon.abilities.map((item, index) => (

                        <Text
                            key={index}
                            style={styles.texto}
                        >
                            • {item.ability.name}
                        </Text>
                    ))
                }

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    scrollContainer: {
        padding: 20,
        paddingBottom: 50,
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagen: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginBottom: 10,
    },

    nombre: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginBottom: 20,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
    },

    subtitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    texto: {
        fontSize: 18,
        textTransform: 'capitalize',
        marginBottom: 10,
    },

    tipoBadge: {
        backgroundColor: '#e53935',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },

    tipoTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

    statContainer: {
        marginBottom: 18,
    },

    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    statNombre: {
        fontSize: 16,
        textTransform: 'capitalize',
        fontWeight: '600',
    },

    statValor: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    barraFondo: {
        width: '100%',
        height: 14,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
    },

    barraProgreso: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
    },
});