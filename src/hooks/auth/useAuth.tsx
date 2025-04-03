export type FormState = {
  username: string;
  email?: string;
  password: string;
  isValid: boolean;
  showPassword: boolean;
};

type Action =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY' };

const validateForm = (state: FormState, formType: 'signup' | 'login'): boolean => {
  return (
    state.username.trim().length >= 4 &&
    state.password.length >= 6 &&
    (formType === 'signup' ? /\S+@\S+\.\S+/.test(state.email || '') : true)
  );
};

const formReducer = (formType: 'signup' | 'login', initialState: FormState) => {
  return (state: FormState, action: Action): FormState => {
    switch (action.type) {
      case 'SET_FIELD': {
        const newState = { ...state, [action.field]: action.value };
        return { ...newState, isValid: validateForm(newState, formType) };
      }
      case 'TOGGLE_PASSWORD_VISIBILITY':
        return { ...state, showPassword: !state.showPassword };
        
      case 'RESET_FORM':
        return initialState;
        
      default:
        return state;
    }
  };
};

const useAuth = (formType: 'signup' | 'login') => {
  const initialState: FormState = {
    username: '',
    email: formType === 'signup' ? '' : undefined,
    password: '',
    isValid: false,
    showPassword: false,
  };

  return { formReducer: formReducer(formType, initialState), initialState };
};

export default useAuth;