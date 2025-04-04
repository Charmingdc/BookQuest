import { useReducer } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FormState } from "@hooks/auth/useAuth.tsx"; 
import useAuth from "@hooks/auth/useAuth.tsx"; 
import useSignupUser from "@hooks/auth/useSignupUser.tsx";

import "./index.css";


const Signup = () => {
  const { formReducer, initialState } = useAuth("signup");
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { signup, loading, logout } = useSignupUser();
  
  const handleChange = (field: keyof FormState, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     try {
      const response = await signup({
       username: state.username,
       email: state.email,
       password: state.password,
      });

     if (response.type === "error") throw new Error(response.message);

     toast.success(response.message);
     dispatch({ type: "RESET_FORM" });
     
     setTimeout(async () => {
      await logout();
     }, 2000);
   } catch (err: any) {
     console.error("Unexpected error testing:", err.message);
     toast.error(err.message);
   }
  };

  return (
    <main className="auth-container">
      <div>
       <div className="flex-center">
        📚
       </div>
       
       <h2> BookQuest </h2>
      </div>

      <form className="auth-form" onSubmit={async (e) => handleSubmit(e)}>
        <h2> Start Exploring </h2> 
        
        <button type="button" className="oauth flex-center">
          Signup with Google
        </button>
        
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        
        <div className="password-input">
         <input
          type={state.showPassword ? "text" : "password"}
          placeholder="Password"
          value={state.password}
          onChange={(e) => handleChange("password", e.target.value)}
         />
         
         <button type="button" onClick={() => dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY"})}>
          { state.showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} /> }
         </button>
        </div>

        <button type="submit" className={`auth-button flex-center ${(!state.isValid || loading) ? "disabled-button" : ""}`} disabled={(!state.isValid || loading)}>
          { loading ? "Processing.." : "Sign Up" }
        </button>
        
        <p>
         Already have an account? <Link to="/login"> login </Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;