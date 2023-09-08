import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, actions) {
  switch (actions.type) {
    case "LOGIN":
      return {
        user: actions.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "IsAmirMmd",
  email: "amirfanweb@gmail.com",
  password: "12345678",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password) {
      dispatch({ type: "LOGIN", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
