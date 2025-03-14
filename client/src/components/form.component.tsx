import {
  Form as RRForm,
  type FormProps as RRFormProps,
} from "react-router-dom";
import { type JSX } from "react";

interface FormProps extends RRFormProps {
  title: string;
}

function Form({ children, className, title, ...rest }: FormProps): JSX.Element {
  return (
    <RRForm
      className={`flex flex-col justify-center items-center shadow-lg bg-secondary p-8 gap-4 rounded-3xl ${className}`}
      {...rest}>
      <div className={`font-semibold text-center text-3xl`}>{title}</div>
      {children}
    </RRForm>
  );
}

export default Form;
