DynamicForms is powered by React Native UI Kitten and Formik
https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten

https://jaredpalmer.com/formik

DOCS STILL UNDER CONSTRUCTION............

Follow instructions on their website to set up your application with UI Kitten.

## Configure Application Root

#### Wrap the root component of your App into ApplicationProvider component. In your App.js:

```

import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import {mapping, light} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <IconRegistry icons={EvaIconsPack} />
        {/* YOUR CODE */}
    </ApplicationProvider>
);

export default App;
```

## TextField

```
    referral_description: {
      type: "textField",
      multiline: true,
      placeholder: "",
      title: "Referral Description"
    }

```

## Common Props

| Prop               | Description                                                                                                                                                                                                                                                                  | Default | Required |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| **`type`**         | Type of field to render, valid values: 'textField', 'selectField', 'checkboxField', 'toggleField', 'radioField', 'datePickerField', 'avatarField', 'tagsInputField', 'pickerField', 'multiSelectPickerField', 'autoCompleteAddressField', 'buttonGroupField', 'fieldSection' | _None_  | Yes      |
| **`placeholder`**  | Placeholder string to display. Only valid in textFields, selectField, pickerField, ...                                                                                                                                                                                       | _None_  | No       |
| **`title`**        | Title to display above the field.                                                                                                                                                                                                                                            | _None_  | No       |
| **`initialValue`** | Initial Value of the field.                                                                                                                                                                                                                                                  | _None_  | Yes      |

## Text Field Props

| Prop                         | Description                                                                                                                                             | Default | Required |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| **`multiline`**              | Make your textfield multiline.                                                                                                                          | _False_ | No       |
| **`secure`**                 | If you want your textfield to be of SecureEntry type                                                                                                    | _False_ | No       |
| **`...otherTextInputProps`** | Any additional Input props will be passed down. refer to this link: https://akveo.github.io/react-native-ui-kitten/docs/components/input/overview#input | _None_  | No       |

## Select Field Props

| Prop                      | Description                                                                                                                                           | Default | Required |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| **`options`**             | Options of the select field. ex: [{text: "Option 1"}, {text: "Option 2"}].                                                                            | _None_  | Yes      |
| **`...otherSelectProps`** | Any additional Select props will be passed down. refer to this link: https://akveo.github.io/react-native-ui-kitten/docs/components/select/api#select | _None_  | No       |

## Toggle Field Props

| Prop                      | Description                                                                                                                                                | Default | Required |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| **`...otherToggleProps`** | Any additional Toggle props will be passed down. refer to this link: https://akveo.github.io/react-native-ui-kitten/docs/components/toggle/overview#toggle | _None_  | No       |

## Tags Input Field Props

| Prop                    | Description                          | Default | Required |
| ----------------------- | ------------------------------------ | ------- | -------- |
| **`tagContainerStyle`** | Style Object for Container.          | _None_  | No       |
| **`tagIconStyle`**      | Style Object for Icon                | _None_  | No       |
| **`tagTextStyle`**      | Style Object for Text                | _None_  | No       |
| **`renderCloseIcon`**   | function to render Close Icon on tag | _None_  | No       |
