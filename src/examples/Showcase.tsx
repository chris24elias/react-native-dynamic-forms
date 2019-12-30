import React from 'react';
import DynamicForm from '..';
import * as yup from 'yup';
import {Text} from '@ui-kitten/components';
import {Field} from '../constants/interfaces';

interface ShowCaseProps {}

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

  customText: {
    type: 'custom',
    initialValue: '',
    component: props => {
      console.log('custom component', props);
      return <Text>{props.value}</Text>;
    },
  },
};

const schema = yup.object({
  text: yup.string().required(),
  text2: yup.string().required(),
  select: yup.string().required(),
  checkbox: yup.boolean().required(),
  toggle: yup.boolean().required(),
  customText: yup.string().required(),
});

const ShowCase = ({}: ShowCaseProps) => {
  return <DynamicForm form={MOCK_FORM} schema={schema} />;
};

export default ShowCase;
