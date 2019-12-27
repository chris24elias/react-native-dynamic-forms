import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DynamicForm, {Field} from './src';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';
import * as yup from 'yup';

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
};

const schema = yup.object({
  text: yup.string().required(),
  text2: yup.string().required(),
  select: yup.string().required(),
  checkbox: yup.boolean().required(),
  toggle: yup.boolean().required(),
  // first_name: ,
  // last_name: yup.string().required(),
  // third_field: yup.boolean(),
  // fourth_field: yup.string().required(),
  // fifth_field: yup.string().required(),
  // six_field: yup.string().required(),
});

const App = ({}) => {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <SafeAreaProvider>
        <DynamicForm form={MOCK_FORM} schema={schema} />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

export default App;
