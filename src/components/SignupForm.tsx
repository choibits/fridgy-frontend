import { type JSX } from "react";
import type { SignupFormData, SignupFormErrors } from "../types";

interface SignupFormProps {
  formData: SignupFormData; // this is the actual values the user is inputting
  errors: SignupFormErrors; //  object with error messages
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // runs when inputs change
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void; // runs when you blur out of an input
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // runs when form is submitted
}

const SignupForm = ({
  formData,
  errors,
  onInputChange,
  onBlur,
  onSubmit,
}: SignupFormProps): JSX.Element => {

  return (
    <form onSubmit={onSubmit}>
      <h2>Join the Fridgy Fam!</h2>

      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={onInputChange}
          onBlur={onBlur}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={onInputChange}
          onBlur={onBlur}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={onInputChange}
          onBlur={onBlur}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <input
          type="checkbox"
          name="agreeToTerms"
          id="agreeToTerms"
          checked={formData.agreeToTerms || false}
          onChange={onInputChange}
        />
        <label htmlFor="agreeToTerms">Agree to the terms and conditions</label>
        {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;