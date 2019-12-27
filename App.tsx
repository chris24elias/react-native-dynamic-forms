import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DynamicForm, {Field} from './src';
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
} from '@ui-kitten/components';
import {mapping, light, dark} from '@eva-design/eva';
import * as yup from 'yup';
import Login from './src/examples/ Login';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as customMapping} from './custom-mapping.json';
import ProfileForm from './src/examples/ProfileForm';

import {default as appTheme} from './custom-theme.json';
import ShowCase from './src/examples/Showcase';

const theme = {...light, ...appTheme};

const App = ({}) => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}
      // customMapping={customMapping}
    >
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        {/* <Login /> */}
        <ProfileForm />
        {/* <ShowCase /> */}
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;
