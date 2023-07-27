import "./button.styles.scss";

const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  default: "",
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  return (
    <button
      isLoading={isLoading}
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <div className="spinner-container" /> : children}
    </button>
  );
};
export default Button;
