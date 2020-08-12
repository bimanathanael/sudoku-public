import React, { useEffect, useDebugValue } from 'react';
import { store} from './store'
import { Provider, useDispatch } from 'react-redux'
import { Home } from './pages/Home'
import { Game } from './pages/Game'
import { Finish } from './pages/Finish'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
 
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Finish" component={Finish} />
            {/* <Home/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

