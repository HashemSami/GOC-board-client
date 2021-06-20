import { HTMLAttributes, AllHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps {
  element: "input";
  props: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface RedioProps {
  element: "radio";
  props: React.InputHTMLAttributes<HTMLInputElement>;
  options: { key: string; label: string; name: string; value: string }[];
}

export interface SelectOrCheckboxProps {
  element: "select" | "checkbox";
  props: React.OptionHTMLAttributes<HTMLOptionElement> | React.InputHTMLAttributes<HTMLInputElement>;
  options: { key: string; label: string; value: string }[];
}

interface FormModelKey {
  key: string;
  label: string;
}

export type FormModel = FormModelKey & (InputProps | RedioProps | SelectOrCheckboxProps);
// DetailedHTMLProps<AllHTMLAttributes<f>, f>
