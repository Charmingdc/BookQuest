import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import '../Signup/index.css';

type FormState = {
 username: string;
 password: string;
 isValid: boolean;
};

type Action =
 | { type: 'SET_FIELD'; field: keyof FormState; value: string }
 | { type: 'RESET_FORM' };

const initialState: FormState = {
 username: '',
 password: '',
 isValid: false,
};

const validateForm = (state: FormState): boolean => {
  return (
    state.username.trim().length > 4 &&
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

const Login = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field: keyof FormState, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! 🎉');
  };

  return (
    <main className='auth-container'>
      <div>
       <div className='flex-center'>
        📚
       </div>
       
       <h2> BookQuest </h2>
      </div>

      <form className='auth-form' onSubmit={handleSubmit}>
        <h2> Welcome Back </h2> 
        
        <button className='oauth flex-center'>
         Login with Google
        </button>
        
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <button type="submit" className='auth-button flex-center' disabled={false/*!state.isValid*/}>
          Login
        </button>
        
        <p>
          Don't have an account? <Link to='/signup'> Signup </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;