import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Pokemon } from '../types/pokemon';

interface Props {
    pokemon: Pokemon;
    onPress: () => void;
}

export default function PokemonCard({
    pokemon,
    onPress,
}: Props) {

    return (

        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >

            <Image
                source={{
                    uri: pokemon.sprites.front_default,
                }}
                style={styles.imagen}
            />

            <View style={styles.infoContainer}>

                <Text style={styles.nombre}>
                    {pokemon.name}
                </Text>

                <Text style={styles.texto}>
                    ID: {pokemon.id}
                </Text>

                <Text style={styles.texto}>
                    Tipo: {pokemon.types[0].type.name}
                </Text>

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

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
        textTransform: 'capitalize',
    },
});