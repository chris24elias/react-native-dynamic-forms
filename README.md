DynamicForms is powered by React Native UI Kitten
https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten

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
| Prop | Description | Default | Required |
|---|---|---|---|
|**`type`**| Type of field to render, valid values: 'textField', 'selectField', 'checkboxField', 'toggleField', 'radioField', 'datePickerField', 'avatarField', 'tagsInputField', 'pickerField', 'multiSelectPickerField', 'autoCompleteAddressField', 'buttonGroupField', 'fieldSection'   |*None*| Yes
|**`placeholder`**| Placeholder string to display. Only valid in textFields, selectField, pickerField, ...  |*None*| No
|**`title`**|Title to display above the field.  |*None*| No
|**`initialValue`**|Initial Value of the field.  |*None*| Yes

## Text Field Props
| Prop | Description | Default | Required |
|---|---|---|---|
|**`multiline`**|Make your textfield multiline.  |*False*| No
|**`secure`**|If you want your textfield to be of SecureEntry type  |*False*| No
|**`...otherTextInputProps`**|Any additional Input props will be passed down. refer to this link: https://akveo.github.io/react-native-ui-kitten/docs/components/input/overview#input |*None*| No

## Select Field Props
| Prop | Description | Default | Required |
|---|---|---|---|
|**`options`**|Options of the select field. ex: [{text: "Option 1"}, {text: "Option 2"}].  |*None*| Yes
|**`...otherSelectProps`**|Any additional Select props will be passed down. refer to this link: https://akveo.github.io/react-native-ui-kitten/docs/components/select/api#select  |*None*| No

## Toggle Field Props
| Prop | Description | Default | Required |
|---|---|---|---|
|**`...otherToggleProps`**|Any additional Toggle props will be passed down. refer to this link: https://akveo.github.io/react-native-ui-kitten/docs/components/toggle/overview#toggle |*None*| No

## Tags Input Field Props
| Prop | Description | Default | Required |
|---|---|---|---|
|**`tagContainerStyle`**|Style Object for Container.  |*None*| No
|**`tagIconStyle`**|Style Object for Icon  |*None*| No
|**`tagTextStyle`**|Style Object for Text  |*None*| No
|**`renderCloseIcon`**|function to render Close Icon on tag  |*None*| No


