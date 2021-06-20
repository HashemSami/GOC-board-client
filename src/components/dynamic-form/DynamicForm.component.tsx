import { FC, useState, Fragment } from "react";
import { DynamicFormContainer, FormGroup, FormGroupRadio, FormActions, FormTitle } from "./DynamicForm.styles";

import { FormModel, RedioProps, SelectOrCheckboxProps } from "../../models";

interface DynamicFormProps {
  title: string;
  model: FormModel[];
  onSubmit: (model: any) => void;
  getOnChangeValues?: (values: any) => void;
}

// const isRadio =(form) => {
//   return form as
// }

type InputHTML = React.InputHTMLAttributes<HTMLInputElement>;

type OptionHTML = React.OptionHTMLAttributes<HTMLOptionElement>;

interface formValuesProps {
  [key: string]: string | number | string[];
}

const DynamicForm: FC<DynamicFormProps> = ({ title = "Dynamic Form", model, onSubmit, getOnChangeValues }) => {
  const [formValues, setFormValues] = useState<formValuesProps | undefined>({});

  // const asyncSetState = (values:formValuesProps, callbackFunction) => setFormValues(values, callbackFunction)

  const handleOnChange = async ({ target: { value } }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: string, type: "single" | "multiple" = "single") => {
    // console.log(e.target.value);
    const updatestate = () => {
      return new Promise((resolve, reject) => {
        switch (type) {
          case "single":
            setFormValues(state => {
              return { ...state, [key]: value };
            });
            break;

          case "multiple":
            if (!formValues) {
              return;
            }

            if (formValues[key]) {
              // if the property exist
              // look for the current value in our state
              const found = (formValues[key] as string[]).find(d => d === value);

              if (!found) {
                // const data = formValues[key] ? [value, ...(formValues[key] as string[])] : [value];

                setFormValues(state => {
                  if (!state) {
                    return;
                  }
                  return { ...state, [key]: [value, ...(state[key] as string[])] };
                });
              } else {
                setFormValues(state => {
                  if (!state) {
                    return;
                  }
                  return { ...state, [key]: [...(state[key] as string[]).filter(item => value !== item)] };
                });
              }
            } else {
              // if the hole property does not exist
              // create a new property with array value
              setFormValues(state => {
                if (!state) {
                  return;
                }
                return { ...state, [key]: [value] };
              });
            }
            break;
        }

        resolve(formValues);
      });
    };

    const stateValues = await updatestate();

    // add the form values to the parent onChange function
    if (getOnChangeValues && stateValues) {
      getOnChangeValues(stateValues);
    }
  };

  const renderForm = () => {
    if (!formValues) {
      return;
    }
    // console.log(formValues);
    const formUI = model.map(modelElement => {
      const { key, label, element, props } = modelElement;
      // const { type = "text" } = props;
      const elementKey = key;
      const target = key;

      const stateValue = formValues[target];

      let input: JSX.Element | JSX.Element[] = <div></div>;

      switch (element) {
        case "input":
          input = <input key={key} {...(props as InputHTML)} value={stateValue} onChange={e => handleOnChange(e, key)} />;
          break;
        case "radio":
          input = (modelElement as RedioProps).options.map(({ key, label, name, value }) => {
            const checked = value === stateValue;
            return (
              <Fragment key={`fr${key}`}>
                <input key={key} {...(props as InputHTML)} type={element} checked={checked} name={name} value={value} onChange={e => handleOnChange(e, name)} />
                <label key={`ll${key}`}>{label}</label>
              </Fragment>
            );
          });
          input = <FormGroupRadio>{input}</FormGroupRadio>;
          break;

        case "select":
          input = (modelElement as SelectOrCheckboxProps).options.map(({ key, label, value }) => {
            const checked = value === stateValue;

            return (
              <Fragment>
                <option {...(props as OptionHTML)} key={key} value={value}>
                  {value}
                </option>
              </Fragment>
            );
          });
          input = (
            <select value={stateValue} onChange={e => handleOnChange(e, key)}>
              {input}
            </select>
          );
          break;

        case "checkbox":
          input = (modelElement as SelectOrCheckboxProps).options.map(({ key, label, value }) => {
            let checked = false;

            if (stateValue && typeof stateValue !== "string" && typeof stateValue !== "number" && stateValue.length > 0) {
              checked = stateValue.indexOf(value) > -1 ? true : false;
            }

            return (
              <Fragment key={`cfr${key}`}>
                <input {...(props as InputHTML)} type={element} key={key} checked={checked} value={value} onChange={e => handleOnChange(e, elementKey, "multiple")} />
                <label key={`ll${key}`}>{label}</label>
              </Fragment>
            );
          });

          input = <FormGroupRadio>{input}</FormGroupRadio>;
      }

      return (
        <FormGroup key={key}>
          <label key={`l${key}`} htmlFor={key}>
            {label}
          </label>
          {input}
        </FormGroup>
      );
    });
    return formUI;
  };

  // send form valus to parent on submit
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    // if(onSubmit) onSubmit()
  };

  return (
    <div>
      <FormTitle>{title}</FormTitle>
      <DynamicFormContainer
        onSubmit={e => {
          onFormSubmit(e);
        }}
      >
        {renderForm()}
        <FormActions>
          <button type="submit">Submit</button>
        </FormActions>
      </DynamicFormContainer>
    </div>
  );
};

export default DynamicForm;

// <DynamicForm
// title="Registeration"
// model={[
//   { key: "name", label: "Name", element: "input", props: { required: true } },
//   { key: "age", label: "Age", element: "input", props: { type: "number" } },
//   { key: "rating", label: "Rating", element: "input", props: { type: "number", min: 0, max: 5 } },
//   { key: "qualification", label: "Qualification", element: "input", props: {} },
//   {
//     key: "gender",
//     label: "Gender",
//     element: "radio",
//     options: [
//       { key: "male", label: "Male", name: "gender", value: "male" },
//       { key: "female", label: "Female", name: "gender", value: "female" },
//     ],
//     props: {},
//   },
//   {
//     key: "city",
//     label: "city",
//     element: "select",
//     options: [
//       { key: "jeddah", label: "Jeddah", value: "jeddah" },
//       { key: "khobar", label: "Khobar", value: "khobar" },
//       { key: "abha", label: "Abha", value: "abha" },
//     ],
//     props: {},
//   },
//   {
//     key: "skills",
//     label: "Skills",
//     element: "checkbox",
//     options: [
//       { key: "react", label: "React", value: "react" },
//       { key: "angular", label: "Angular", value: "angular" },
//       { key: "vue", label: "Vue", value: "vue" },
//     ],
//     props: {},
//   },
// ]}
// onSubmit={model => {
//   onSubmit(model);
// }}
// getOnChangeValues={values => han(values)}
// />
