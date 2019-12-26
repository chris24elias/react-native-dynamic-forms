/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DynamicForm from './src';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';

const App = ({}) => {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <SafeAreaProvider>
        <DynamicForm />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;
