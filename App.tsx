import {useHeaderHeight} from '@react-navigation/elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useLayoutEffect, useState} from 'react';
import {Button, FlatList, Text, useWindowDimensions, View} from 'react-native';
import {TabView} from 'react-native-tab-view';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Details screen"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Screen with search bar"
        onPress={() => navigation.navigate('SearchBar')}
      />
      <Button
        title="Screen with search bar without tabs"
        onPress={() => navigation.navigate('SearchBarWithoutTabs')}
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  const height = useHeaderHeight();
  console.log('details height', height);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to screen with search bar"
        onPress={() => navigation.navigate('SearchBar')}
      />
    </View>
  );
}

const renderScene = ({route}) => {
  switch (route.key) {
    case '1':
      return <List numberOfElements={10} />;
    case '2':
      return <List numberOfElements={5} />;
    default:
      return null;
  }
};

const List = ({numberOfElements}) => {
  const data = Array.from(Array(numberOfElements).keys());

  const height = useHeaderHeight();
  console.log('height', height);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={data}
      renderItem={({item}) => {
        return (
          <View style={{backgroundColor: 'blue'}}>
            <Text style={{fontSize: 25}}>{item}</Text>
          </View>
        );
      }}
    />
  );
};

const routes = [
  {key: '1', title: 'Screen 1'},
  {key: '2', title: 'Screen 2'},
];

function SearchBarScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        autoCapitalize: 'none',
        placement: 'stacked',
        hideWhenScrolling: false,
        shouldShowHintSearchIcon: false,
        hideNavigationBar: true,
      },
    });
  }, [navigation]);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}

function SearchBarScreenWithoutTabs({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        autoCapitalize: 'none',
        placement: 'stacked',
        hideWhenScrolling: false,
        shouldShowHintSearchIcon: false,
        hideNavigationBar: true,
      },
    });
  }, [navigation]);

  return <List numberOfElements={15} />;
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchBar" component={SearchBarScreen} />
        <Stack.Screen
          name="SearchBarWithoutTabs"
          component={SearchBarScreenWithoutTabs}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
