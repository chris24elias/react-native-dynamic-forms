import React from 'react';
import DynamicForm from '..';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';

const loginForm = {
  shipper: {
    type: 'textField',
    placeholder: 'Company Name',
    title: 'Shipper',
    initialValue: '',
    keyboardType: 'email-address',
  },
  location: {
    type: 'textField',
    placeholder: 'Address',
    title: 'Location',
    initialValue: '',
  },

  BOL: {
    type: 'textField',
    placeholder: 'Optional',
    title: 'BOL #',
    initialValue: '',
  },

  section: {
    type: 'fieldSection',
    fields: {
      service_mode: {
        type: 'selectField',
        placeholder: '',
        title: 'Service Mode',
        initialValue: 'LTL',
        options: [{text: 'LTL'}, {text: 'Option 2'}, {text: 'Option 3'}],
      },

      transit_service: {
        type: 'selectField',
        placeholder: 'Select One...',
        title: 'Transit Service',
        initialValue: 'Option 2',
        options: [{text: 'LTL'}, {text: 'Option 2'}, {text: 'Option 3'}],
      },
    },
  },

  radio: {
    type: 'radioField',
    placeholder: 'check',
    title: 'Pickup Services',
    initialValue: null,
    options: [
      {text: 'Construction Site'},
      {text: 'Courier Service'},
      {text: 'something Service'},
      {text: 'Dropped Trailer'},
      {text: 'Inside Service'},
    ],
    style: {marginLeft: 15},
  },

  pickup_request: {
    type: 'datePickerField',
    placeholder: 'Select Date...',
    title: 'Date Pickup Requested',
    initialValue: '',
    // options: [{text: 'LTL'}, {text: 'Option 2'}, {text: 'Option 3'}],
  },

  pickup_actual: {
    type: 'datePickerField',
    placeholder: 'Select Date...',
    title: 'Date Pickup Actual',
    initialValue: '',
    // options: [{text: 'LTL'}, {text: 'Option 2'}, {text: 'Option 3'}],
  },

  button_group: {
    type: 'buttonGroupField',
    buttons: [
      {
        label: 'Business',
        value: 1,
      },
      {
        label: 'Economy',
        value: 2,
      },
      {
        label: 'Economy +',
        value: 3,
      },
    ],
    title: 'Seat Type',
    initialValue: null,
  },
};

const schema = yup.object({});

const CreateShipment = ({}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DynamicForm
        form={loginForm}
        schema={schema}
        onSubmit={values => {
          console.log('SUBMITTED VALUES', values);
        }}
        submitButtonText="Login"
        submitButtonStyle={{}}
        submitButtonTextStyle={{}}
      />
    </SafeAreaView>
  );
};

export default CreateShipment;
