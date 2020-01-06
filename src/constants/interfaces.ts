export interface FieldComponentProps {
  value: any;
  setValue: any;
  placeholder?: any;
  error: any;
  title: string;
}

export interface Option {
  label: string;
  value: any;
}

export interface Field {
  type:
    | "textField"
    | "selectField"
    | "checkboxField"
    | "toggleField"
    | "radioField"
    | "datePickerField"
    | "avatarField"
    | "tagsInputField"
    | "pickerField"
    | "multiSelectPickerField"
    | "autoCompleteAddressField"
    | "buttonGroupField"
    | "fieldSection"
    | "row";
  placeholder?: string;
  title: string;
  initialValue: any;
  options?: Option[];
  secure?: boolean;
  fields?: { [x: string]: Field };
}

// interface Option {
//   text: string;
// }
