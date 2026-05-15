import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pantallas/Home';
import DetallePokemon from '../pantallas/DetallePokemon';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Pokédex',
                }}
            />

            <Stack.Screen
                name="DetallePokemon"
                component={DetallePokemon}
                options={{
                    title: 'Detalle Pokémon',
                }}
            />

        </Stack.Navigator>
    );
}