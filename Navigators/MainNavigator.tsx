import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from '../screens/InicioScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Tab_Welcome" component={MyTab}/>
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function MyTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
      <Tab.Screen name="Bienvenido" component={WelcomeScreen} options={{tabBarStyle:{display:'none'}}}/>
      <Tab.Screen name="Juego" component={GameScreen} options={{tabBarStyle:{display:'none'}}}/>
      <Tab.Screen name="Puntuación" component={ScoreScreen}options={{tabBarStyle:{display:'none'}}}/>
    </Tab.Navigator>
  );
}
export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}