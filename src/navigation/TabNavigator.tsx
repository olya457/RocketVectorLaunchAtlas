import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlacesScreen from '../screens/PlacesScreen';
import MapScreen from '../screens/MapScreen';
import QuizScreen from '../screens/QuizScreen';
import FactsScreen from '../screens/FactsScreen';
import NotesScreen from '../screens/NotesScreen';
import SavedScreen from '../screens/SavedScreen';
import FloatingTabBar from '../components/FloatingTabBar';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Places" component={PlacesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
