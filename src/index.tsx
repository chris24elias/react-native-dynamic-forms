import React, { useEffect, useState, Fragment } from "react";
import { View, Keyboard } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import { Formik, FormikProps } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckboxField from "./components/CheckboxField";
import TextField from "./components/TextField";
import SelectField from "./components/SelectField";
import ToggleField from "./components/ToggleField";
import RadioField from "./components/RadioField";
import DatePickerField from "./components/DatePickerField";
import ChooseAvatar from "./components/ChooseAvatar";
import TagsInputField from "./components/TagsInputField";
import PickerField from "./components/PickerField";
import MultiSelectPickerField from "./components/MultiSelectPickerField";
import AutoCompleteAddressField from "./components/AutoCompleteAddressField";
import styles from "./constants/styles";
import { Field } from "./constants/interfaces";
import ButtonGroupField from "./components/ButtonGroupField";

interface DynamicFormProps {
  form: { [x: string]: Field };
  schema: any;
  onSubmit: any;
  showErrorSummary?: boolean;
  submitButtonStyle?: any;
  submitButtonTextStyle?: any;
  containerStyle?: any;
  contentContainerStyle?: any;
  scrollViewProps?: any;
  formikProps?: any;
  showsVerticalScrollIndicator?: boolean;
  submitButtonText?: string;
  renderSubmitButton?: (isValid: boolean, handleSubmit: any) => any;
  renderHeader?: (props: FormikProps<any>) => any;
  initialValues?: any;
}

const DynamicForm = ({
  form: masterForm,
  schema,
  initialValues = {},
  onSubmit,
  showErrorSummary = false,
  submitButtonStyle = {},
  submitButtonTextStyle = {},
  containerStyle = {},
  contentContainerStyle = {},
  scrollViewProps = {},
  formikProps,
  showsVerticalScrollIndicator = false,
  submitButtonText = "Submit",
  renderSubmitButton,
  renderHeader
}: DynamicFormProps) => {
  const refs = [];
  let textFieldKeys = [];
  let textFieldCount = 0;
  let allFieldsCount = 0;

  function renderForm(form, props: FormikProps<any>) {
    if (!form) {
      return null;
    }

    let fields = Object.keys(form);
    return renderFields(form, fields, props);
  }

  function renderFields(form, fields, formikProps) {
    const { values, errors, handleSubmit, setFieldValue } = formikProps;

    return fields.map((key, index) => {
      const field = form[key];
      const name = key;
      allFieldsCount++;
      const { type, placeholder, title, options, initialValue, ...otherProps } = field;

      const sharedFieldProps = {
        ...otherProps,
        key: index,
        value: values[name],
        error: errors[name],
        setValue: (value, shouldValidate) => {
          setFieldValue(name, value, shouldValidate);
        },
        title: title,
        placeholder,
        data: options,
        setFieldValue
      };

      if (type == "custom" && field.component) {
        let CustomComponent = field.component;
        let { key, component, ...restProps } = sharedFieldProps;
        return <CustomComponent key={key} {...restProps} />;
      }

      if (type == "textField") {
        let extraProps = {};
        if (!sharedFieldProps.disabled) {
          textFieldKeys.push(index);
          textFieldCount++;
          extraProps = {
            textFieldIndex: textFieldCount,
            getRef: ref => (refs[index] = ref),
            returnKeyLabel: "Next",
            onSubmitEditing: keyIndex => {
              if (refs[textFieldKeys[keyIndex]]) {
                refs[textFieldKeys[keyIndex]].focus();
              } else {
                // handleSubmit();
                Keyboard.dismiss();
              }
            }
          };
        }

        return <TextField {...extraProps} {...sharedFieldProps} />;
      }

      // @TODO FIX MULTISELECT
      if (type == "selectField") {
        return <SelectField {...sharedFieldProps} />;
      }

      if (type == "radioField") {
        return <RadioField {...sharedFieldProps} />;
      }

      if (type == "checkboxField") {
        return <CheckboxField {...sharedFieldProps} />;
      }

      if (type == "toggleField") {
        return <ToggleField {...sharedFieldProps} />;
      }

      if (type == "datePickerField") {
        return <DatePickerField {...sharedFieldProps} />;
      }

      if (type == "avatarField") {
        return <ChooseAvatar {...sharedFieldProps} />;
      }

      if (type == "tagsInputField") {
        return <TagsInputField {...sharedFieldProps} />;
      }

      if (type == "pickerField") {
        return (
          <PickerField
            {...sharedFieldProps}
            status={
              sharedFieldProps.error
                ? "danger"
                : sharedFieldProps.value && sharedFieldProps.value
                ? "success"
                : "basic"
            }
          />
        );
      }

      if (type == "multiSelectPickerField") {
        return (
          <MultiSelectPickerField
            {...sharedFieldProps}
            status={
              sharedFieldProps.error
                ? "danger"
                : sharedFieldProps.value && sharedFieldProps.value.length
                ? "success"
                : "basic"
            }
          />
        );
      }

      if (type == "autoCompleteAddressField") {
        return <AutoCompleteAddressField {...sharedFieldProps} />;
      }

      if (type == "buttonGroupField") {
        return <ButtonGroupField {...sharedFieldProps} />;
      }

      if (type == "fieldSection") {
        return (
          <View key={sharedFieldProps.key} style={{ flexDirection: "row" }}>
            {renderForm(field.fields, formikProps)}
          </View>
        );
      }
    });
  }

  function renderErrors(errors) {
    if (!showErrorSummary) {
      return null;
    }
    if (errors && Object.keys(errors).length) {
      let x = Object.keys(errors).map((key, index) => {
        const error = errors[key];
        return (
          <Text key={index} style={{ marginBottom: 5 }} category="c2" status={"warning"}>
            • {error}
          </Text>
        );
      });

      return (
        <View
          style={{
            backgroundColor: "#ffeaa780",
            padding: 10,
            borderRadius: 8,
            ...styles.fieldContainer
          }}
        >
          <Text style={{ marginBottom: 7 }} category="s1" status={"warning"}>
            Please address the following
          </Text>
          <View style={{ paddingLeft: 5 }}>{x}</View>
        </View>
      );
    }
    return null;
  }

  function onsubmit(values, formikActions) {
    if (onSubmit) {
      onSubmit(values, formikActions);
    }
  }

  function getInitialValues(form) {
    const initialValuesObj = {};
    getInitialValuesHelper(form, initialValuesObj);
    return initialValuesObj;
  }

  function getInitialValuesHelper(form, initialValuesObj) {
    Object.keys(form).forEach(key => {
      const field: Field = form[key];
      const { type, initialValue } = field;

      let value = initialValue;

      if (initialValues[key] != undefined) {
        value = initialValues[key];
      }
      if (type == "fieldSection") {
        // do something
        getInitialValuesHelper(field.fields, initialValuesObj);
      } else {
        initialValuesObj[key] = value;
      }
    });
  }

  function renderSubmit(isValid, handleSubmit, setErrors) {
    if (renderSubmitButton) {
      return renderSubmitButton(isValid, handleSubmit);
    }
    return (
      <Button
        style={[{ marginTop: 5 }, submitButtonStyle]}
        textStyle={submitButtonTextStyle}
        disabled={!isValid}
        onPress={() => handleSubmit()}
      >
        {submitButtonText}
      </Button>
    );
  }

  function renderHeaderComponent(props) {
    if (renderHeader) {
      return renderHeader(props);
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={getInitialValues(masterForm)}
      onSubmit={onsubmit}
      {...formikProps}
    >
      {props => {
        return (
          <Fragment>
            {renderHeaderComponent(props)}
            <Layout style={[{ flex: 1, padding: 15 }, containerStyle]}>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                contentContainerStyle={contentContainerStyle}
                enableResetScrollToCoords={false}
                extraScrollHeight={50}
                extraHeight={100}
                {...scrollViewProps}
              >
                {renderForm(masterForm, props)}
                {renderErrors(props.errors)}
                {renderSubmit(props.isValid, props.handleSubmit, props.setErrors)}
              </KeyboardAwareScrollView>
            </Layout>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default React.memo(DynamicForm);
