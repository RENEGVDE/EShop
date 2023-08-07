import { FC, ChangeEvent } from "react";

import "./form-input.styles.scss";

export interface IFormInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  name: string;
  type: string;
  required?: boolean;
}

const FormInput: FC<IFormInputProps> = ({
  label,
  ...otherProps
}: IFormInputProps) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default FormInput;
