import { useReducer } from 'react';
import './index.css';

type FormState = {
  username: string;
  email: string;
  password: string;
  isValid: boolean;
};

type Action =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

const initialState: FormState = {
  username: '',
  email: '',
  password: '',
  isValid: false,
};

const validateForm = (state: FormState): boolean => {
  return (
    state.username.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(state.email) &&
    state.password.length >= 6
  );
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_FIELD': {
      const newState = { ...state, [action.field]: action.value };
      return { ...newState, isValid: validateForm(newState) };
    }

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
};

const Signup = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field: keyof FormState, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! 🎉');
  };

  return (
    <main>
      <h2>Signup Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <button type="submit" disabled={!state.isValid}>
          Sign Up
        </button>
        
        <button type="button" onClick={() => dispatch({ type: 'RESET_FORM' })}>
          Reset
        </button>
      </form>
    </main>
  );
};

export default Signup;