import React, { useEffect, useState, Fragment } from "react";
import { View, Keyboard, Platform } from "react-native";
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
import FieldSection from "./components/FieldSection";

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
  initialValues: any;
  onFormUpdate: (props: FormikProps<any>) => any;
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
  renderHeader,
  onFormUpdate
}: DynamicFormProps) => {
  const refs = [];
  let textFieldKeys = [];
  let textFieldCount = 0;
  let allFieldsCount = 0;

  function renderForm(form, props: FormikProps<any>) {
    if (!form) {
      return null;
    }

    let master = form;
    if (typeof form == "function") {
      master = form(props);
    }

    let fields = Object.keys(master);
    return renderFields(master, fields, props);
  }

  function renderFields(form, fields, formikProps: FormikProps<any>) {
    const {
      values,
      errors,
      handleSubmit,
      validateField,
      setFieldValue,
      handleBlur,
      setFieldTouched,
      touched
    } = formikProps;

    return fields.map((key, index) => {
      const field = form[key];
      const name = key;
      allFieldsCount++;
      const { type, placeholder, title, options, initialValue, ...otherProps } = field;

      const err = touched[name] && errors[name] ? errors[name] : undefined;
      const sharedFieldProps = {
        ...otherProps,
        key: index,
        value: values[name],
        error: err,
        setValue: (value, shouldValidate) => {
          setFieldValue(name, value, shouldValidate);
        },
        onBlur: e => {
          setFieldTouched(name, true, true);
        },
        title: title,
        placeholder,
        data: options,
        setFieldValue,
        status: err ? "danger" : values[name] && values[name] ? "success" : "basic"
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
        return <PickerField {...sharedFieldProps} size={Platform.OS == "ios" ? "medium" : "small"} />;
      }

      if (type == "multiSelectPickerField") {
        return (
          <MultiSelectPickerField {...sharedFieldProps} size={Platform.OS == "ios" ? "medium" : "small"} />
        );
      }

      if (type == "autoCompleteAddressField") {
        return (
          <AutoCompleteAddressField {...sharedFieldProps} size={Platform.OS == "ios" ? "medium" : "small"} />
        );
      }

      if (type == "buttonGroupField") {
        return <ButtonGroupField {...sharedFieldProps} />;
      }

      if (type == "row") {
        return (
          <View key={sharedFieldProps.key} style={{ flexDirection: "row" }}>
            {renderForm(field.fields, formikProps)}
          </View>
        );
      }

      if (type == "fieldSection") {
        return (
          <FieldSection key={sharedFieldProps.key} {...sharedFieldProps}>
            {renderForm(field.fields, formikProps)}
          </FieldSection>
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
      if (type == "fieldSection" || type == "row") {
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
      // initialValues={getInitialValues(masterForm)}
      initialValues={initialValues}
      onSubmit={onsubmit}
      validateOnChange={true}
      validateOnBlur={true}
      {...formikProps}
    >
      {props => {
        if (onFormUpdate) {
          onFormUpdate(props);
        }

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
                keyboardShouldPersistTaps={"handled"}
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
