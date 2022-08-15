import 'react-native-gesture-handler';
import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import Driver from './pages/Driver';
import axios from 'axios';

export type RootStackParamList = {
  Home: undefined;
  Driver: {driverId: string; driverName: string};
};

axios.defaults.withCredentials = true;

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Group>
              <RootStack.Screen
                name="Home"
                component={Home}
                options={{title: 'Главная'}}
              />
            </RootStack.Group>
            <RootStack.Group>
              <RootStack.Screen
                name="Driver"
                options={({route}) => ({
                  title: route.params.driverName,
                })}
                component={Driver}
              />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
