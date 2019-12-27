import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DynamicForm, {Field} from './src';
import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';
import * as yup from 'yup';
import Login from './examples/ Login';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as customMapping} from './custom-mapping.json';

const MOCK_FORM: {[x: string]: Field} = {
  text: {
    type: 'textField',
    placeholder: 'text',
    title: 'Text',
    initialValue: '',
  },
  text2: {
    type: 'textField',
    placeholder: 'text',
    title: 'Text 2',
    initialValue: 'hey',
  },
  select: {
    type: 'selectField',
    placeholder: 'select one',
    title: 'Select',
    options: [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}],
    initialValue: 'Option 1',
    multiSelect: false,
  },
  checkbox: {
    type: 'checkboxField',
    placeholder: 'check',
    title: 'Checkbox',
    initialValue: false,
  },
  toggle: {
    type: 'toggleField',
    placeholder: 'toggle',
    title: 'Toggle',
    initialValue: true,
  },
  radio: {
    type: 'radioField',
    placeholder: 'select one',
    title: 'Radio',
    options: [{text: 'Option 1'}, {text: 'Option 2'}, {text: 'Option 3'}],
    initialValue: 'Option 2',
  },
  datePicker: {
    type: 'datePickerField',
    title: 'Date',
    initialValue: new Date(),
  },
};

const schema = yup.object({
  text: yup.string().required(),
  text2: yup.string().required(),
  select: yup.string().required(),
  checkbox: yup.boolean().required(),
  toggle: yup.boolean().required(),
});

const App = ({}) => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={lightTheme}
      customMapping={customMapping}>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        {/* <DynamicForm form={MOCK_FORM} schema={schema} />
         */}
        <Login />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;
