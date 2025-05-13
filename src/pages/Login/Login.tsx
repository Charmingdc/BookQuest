import { useReducer } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FormState } from "@hooks/auth/useAuth.tsx"; 
import useAuth from "@hooks/auth/useAuth.tsx"; 
import useSigninUser from "@hooks/auth/useSigninUser.tsx";
import useGoogleAuth from "@hooks/auth/useGoogleAuth.tsx";

import '../Signup/index.css';


const Login = () => {
 const { formReducer, initialState } = useAuth('login');
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { signin, loading } = useSigninUser();
  const { googleAuth, googleLoading } = useGoogleAuth();
  

  const handleChange = (field: keyof FormState, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
     const response = await signin({
      username: state.username,
      password: state.password
     });
     
     if (response.type === "error") throw new Error(response.message);
     
     toast.success('Welcome back!');
    } catch (err: any) {
     toast.error(err.message);
    } finally {
     dispatch({ type: 'RESET_FORM'});
    }
  };
  
  
  const handleGoogleLogin = async () => {
   try {
     const response = await googleAuth();

     if (response.type === "error") throw new Error(response.message);

     toast.success(response.message);
   } catch (err: any) {
     toast.error(err.message);
   }
  }

  return (
    <main className='auth-container'>
      <div className='flex-center'>
       <div className='flex-center'>
        📚
       </div>
       
       <h2> BookQuest </h2>
      </div>

      <form className='auth-form' onSubmit={async(e) => handleSubmit(e)}>
        <h2> Welcome Back </h2> 
        
        <button type="button"
         onClick={handleGoogleLogin}
         className={`oauth flex-center ${googleLoading ? "disabled-button" : ""}`} 
         disabled={googleLoading}>
          {googleLoading ? 'Processing...' : 'Login with Google' }
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
        
        <button type="submit" className={`auth-button flex-center ${(!state.isValid || loading) ? 'disabled-button' : ''}`} disabled={(!state.isValid || loading)}>
          { loading ? 'Processing...' : 'Login' }
        </button>
        
        <p>
          Don't have an account? <Link to='/signup'> Signup </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;