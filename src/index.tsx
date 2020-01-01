import React, { useEffect, useState } from "react";
import { View } from "react-native";
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
  renderSubmitButton?: any;
  errors?: any;
}

const DynamicForm = ({
  form: masterForm,
  schema,
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
  errors
}: DynamicFormProps) => {
  const refs = [];
  let textFieldKeys = [];

  const [setFieldErrorsRef, setSetFieldErrorsRef] = useState(null);

  useEffect(() => {
    if (errors) {
      setFieldErrorsRef(errors);
    }
  }, [errors]);

  function renderForm(form, props: FormikProps<any>) {
    if (!form) {
      return null;
    }

    let textFieldCount = 0;
    textFieldKeys = [];
    let fields = Object.keys(form);
    return renderFields(form, fields, props, { textFieldCount, textFieldKeys });
  }

  function renderFields(form, fields, formikProps, { textFieldCount, textFieldKeys }) {
    const { values, errors, handleSubmit, setFieldValue } = formikProps;

    return fields.map((key, index) => {
      const field = form[key];
      const name = key;
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
        data: options
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
            returnKeyLabel: index == fields.length - 1 ? "Submit" : "Next",
            onSubmitEditing: keyIndex => {
              if (index < fields.length - 1) {
                if (refs[textFieldKeys[keyIndex]]) {
                  refs[textFieldKeys[keyIndex]].focus();
                }
              } else {
                handleSubmit();
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

  function onsubmit(values) {
    if (onSubmit) {
      onSubmit(values);
    }
  }

  function getInitialValues(form) {
    const initialValues = {};
    getInitialValuesHelper(form, initialValues);
    return initialValues;
  }

  function getInitialValuesHelper(form, initialValues) {
    Object.keys(form).forEach(key => {
      const field: Field = form[key];
      const { type, initialValue } = field;
      if (type == "fieldSection") {
        // do something
        getInitialValuesHelper(field.fields, initialValues);
      } else if (type == "selectField") {
        if (initialValue) {
          initialValues[key] = { text: initialValue };
        } else {
          initialValues[key] = initialValue;
        }
      } else {
        initialValues[key] = initialValue;
      }
    });
  }

  function renderSubmit(isValid, handleSubmit) {
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

  return (
    <Formik
      validationSchema={schema}
      initialValues={getInitialValues(masterForm)}
      onSubmit={onsubmit}
      {...formikProps}
    >
      {props => {
        if (!setFieldErrorsRef) {
          setSetFieldErrorsRef(props.setErrors);
        }

        return (
          <Layout style={[{ flex: 1, padding: 15 }, containerStyle]}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              contentContainerStyle={contentContainerStyle}
              {...scrollViewProps}
            >
              {renderForm(masterForm, props)}
              {renderErrors(props.errors)}
              {renderSubmit(props.isValid, props.handleSubmit)}
            </KeyboardAwareScrollView>
          </Layout>
        );
      }}
    </Formik>
  );
};

export default React.memo(DynamicForm);
