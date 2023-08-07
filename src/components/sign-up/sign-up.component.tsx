import { FC, useState, ChangeEvent, FormEvent } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { ButtonTypes } from "../button/button.component";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import "./sign-up.styles.scss";

interface ISignUpState {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormFields: ISignUpState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp: FC = () => {
  const [formFields, setFormFields] = useState<ISignUpState>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const result = await createAuthUserWithEmailAndPassword(email, password);

      if (result) {
        await createUserDocumentFromAuth(result.user, { displayName });
      }

      setFormFields(defaultFormFields);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already in use");
      } else if ((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL) {
        alert("Invalid email");
      } else if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
        alert("Weak password");
      } else {
        alert("Unknown error");
      }
      console.error(error);
    }
  };

  return (
    <div className="sign-up">
      <h2>Don't have an account?</h2>
      <span>Sign Up</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit" buttonType={ButtonTypes.default}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUp;
