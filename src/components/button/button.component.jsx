import "./button.styles.scss";

const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  default: "",
};

const Button = ({ children, buttonType, isloading, ...otherProps }) => {
  return (
    <button
      disabled={isloading}
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isloading ? <div className="spinner-container" /> : children}
    </button>
  );
};
export default Button;
