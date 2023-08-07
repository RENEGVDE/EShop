import { FC, useState, ChangeEvent, FormEvent } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button, { ButtonTypes } from "../button/button.component";

import "./sign-in.styles.scss";

interface ISignInState {
  email: string;
  password: string;
}

const defaultFormFields: ISignInState = {
  email: "",
  password: "",
};

const SignIn: FC = () => {
  const [formFields, setFormFields] = useState<ISignInState>(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      setFormFields(defaultFormFields);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
        alert("Wrong password");
      } else if ((error as AuthError).code === AuthErrorCodes.NULL_USER) {
        alert("User not found");
      } else if ((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL) {
        alert("Invalid email");
      } else if ((error as AuthError).code === AuthErrorCodes.USER_DISABLED) {
        alert("User disabled");
      } else if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
        alert("User deleted");
      } else {
        alert("Unknown error");
      }
      console.error(error);
    }
  };

  return (
    <div className="sign-in">
      <span>Sign In</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType={ButtonTypes.default}>
            Sign In
          </Button>
          <Button
            type="button"
            buttonType={ButtonTypes.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
