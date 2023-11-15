import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import TripsHomeScreen from './screens/TripsHomeScreen';
import TripDetailsScreen from './screens/TripDetailsScreen';
import PackingListScreen from './screens/PackingListScreen';

import { rootReducer } from './data/Reducer';


const store = configureStore({
  reducer: rootReducer, 
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function ListTabStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='TripsHome' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='TripsHome' component={TripsHomeScreen}/>
      <Stack.Screen name='TripDetails' component={TripDetailsScreen}/>
      <Stack.Screen name='PackingList' component={PackingListScreen}/>
    </Stack.Navigator>
  )
}

function AppContainer() {
  const Tabs = createBottomTabNavigator();

  const initListItems = [
    { text: 'Get costume', key: Date.now() },
    { text: 'Get candy', key: Date.now() + 1}
  ];

  const [listItems, setListItems] = useState(initListItems);

  return(
    <Provider store={store}>
      <NavigationContainer>
        <ListTabStack></ListTabStack>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;