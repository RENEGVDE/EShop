import "./button.styles.scss";
import { FC } from "react";

export enum ButtonTypes {
  google = "google-sign-in",
  inverted = "inverted",
  default = "",
}

export interface IButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  buttonType: ButtonTypes;
  isDisabled?: boolean;
  onClick?: () => void;
}
const Button: FC<IButtonProps> = ({
  children,
  buttonType,
  isDisabled = false,
  ...otherProps
}: IButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`button-container ${buttonType}`}
      {...otherProps}
    >
      {isDisabled ? <div className="spinner-container" /> : children}
    </button>
  );
};
export default Button;
