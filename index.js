import React from "react";
import { Controller, get } from "react-hook-form";
import {
  Checkbox,
  DatePicker,
  Editor,
  FormDropdown,
  FormField,
  FormGroup,
  FormInput,
  FormRadio,
  FormTextArea,
} from "semantic-ui-react";

function Form({ children, control, errors, onSubmit = () => {}, ...rest }) {
  return (
    <form noValidate className="ui form" onSubmit={onSubmit} {...rest}>
      {React.Children.map(children, (child) => {
        const { name } = child.props;

        if (!name) return child;

        const error = get(errors, name, null);
        return React.createElement(child.type, {
          ...{
            ...child.props,
            control,
            key: name,
            error: error && { content: error?.message },
          },
        });
      })}
    </form>
  );
}

function Input({
  control,
  defaultValue,
  name,
  label,
  required,
  children,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <FormField required={required}>
          <label htmlFor={name}>{label}</label>
          {children}
          <FormInput
            value={value}
            id={name}
            onChange={(e, { value: val }) => onChange(val)}
            {...rest}
          />
        </FormField>
      )}
    />
  );
}

function TextArea({ control, name, label, children, required, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormField required={required}>
          <label>{label}</label>
          {children}
          <FormTextArea
            value={value}
            onChange={(e, { value: val }) => onChange(val)}
            {...rest}
          />
        </FormField>
      )}
    />
  );
}

function Select({ control, name, children, required, label, ...rest }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormField required={required}>
          <label htmlFor={name}>{label}</label>
          {children}
          <FormDropdown
            selection
            id={name}
            value={value}
            onChange={(e, { value: val }) => onChange(val)}
            {...rest}
          />
        </FormField>
      )}
    />
  );
}

function Checkbox({ control, name, required, label, children, ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormField required={required}>
          <Checkbox
            id={name}
            checked={value}
            onChange={(e, { checked }) => onChange(checked)}
            {...rest}
          />
          <label htmlFor={name}>{label}</label>
          {children}
        </FormField>
      )}
    />
  );
}

function Radio({ control, name, label, optionList, ...rest }) {
  // ? options example : [{label:'Male', radioValue:'male'}]
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormField>
          <label>{label}</label>
          <FormGroup>
            {optionList.map(({ radioValue, label, ...restOptions }) => (
              <FormRadio
                key={`radiovalue__${radioValue}`}
                value={radioValue}
                checked={value === radioValue}
                label={label}
                onChange={(e, { value: val }) => onChange(val)}
                {...restOptions}
              />
            ))}
          </FormGroup>
        </FormField>
      )}
    />
  );
}

function Editor({ control, error, name, label, formFieldProps, ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <FormField>
          <label>{label}</label>
          <Editor
            setDefaultStyle="color:#828ea7"
            setContents={value}
            onBlur={onBlur}
            onChange={(content) => {
              onChange(content);
            }}
            {...rest}
          />
          {error && (
            <div
              className="ui pointing above prompt label"
              role="alert"
              aria-atomic="true"
            >
              {error.content}
            </div>
          )}
        </FormField>
      )}
    />
  );
}

function DateTimePicker({
  control,
  name,
  label,
  error,
  formFieldProps,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormField {...formFieldProps}>
          <label htmlFor="date-time-picker">{label}</label>

          <DatePicker
            id="date-time-picker"
            className="vmo-picker"
            value={value}
            onChange={(value) => onChange(value)}
            inputProps={{
              component: (props) => <input {...props} readOnly />,
            }}
            {...rest}
          />

          {error && (
            <div
              className="ui pointing above prompt label"
              role="alert"
              aria-atomic="true"
            >
              {error.content}
            </div>
          )}
        </FormField>
      )}
    />
  );
}

export {
  Form,
  Input,
  TextArea,
  Select,
  Checkbox,
  Radio,
  DateTimePicker,
  Editor,
};
