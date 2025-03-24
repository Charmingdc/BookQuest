import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FormState } from '@hooks/auth/useAuth.tsx'; 
import useAuth from '@hooks/auth/useAuth.tsx'; 

import '../Signup/index.css';


const Login = () => {
 const { formReducer, initialState } = useAuth('login');
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field: keyof FormState, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! 🎉, Check console');
    console.log(`Username: ${state.username}, Password: ${state.password}`)
  };

  return (
    <main className='auth-container'>
      <div className='flex-center'>
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
        
        <div className='password-input'>
         <input
          type={state.showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={state.password}
          onChange={(e) => handleChange('password', e.target.value)}
         />
         
         <button type="button" onClick={() => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY'})}>
          { state.showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} /> }
         </button>
        </div>
        
        <div className="reset-link">
         <Link to="/reset_password">
          Forgot password?
         </Link>
        </div>

        <button type="submit" className={`auth-button flex-center ${!state.isValid ? 'disabled-button' : ''}`} disabled={!state.isValid}>
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