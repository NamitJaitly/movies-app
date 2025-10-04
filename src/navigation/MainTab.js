import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeMovies from '../pages/HomeMovies';
import SearchScreen from '../pages/SearchScreen';
import HomePage from '../pages/HomePage';

const Tab = createBottomTabNavigator();

export default function MainTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={HomeMovies} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TV" component={HomePage} />
    </Tab.Navigator>
  );
}