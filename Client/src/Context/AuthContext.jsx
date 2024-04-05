import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User"); // get from localStorage
    setUser(JSON.parse(user || null)); // set user
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        registerInfo
      );

      setIsRegisterLoading(false);

      if (response.error) {
        setRegisterError(response);
      }

      // store  user data localStorage
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(`${baseUrl}/users/login`, loginInfo);

      setIsLoginLoading(false);

      if (response.error) {
        setLoginError(response);
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      }
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User"); // Remove local strogae data
    setUser(null); // set User to null
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        loginInfo,
        updateRegisterInfo,
        updateLoginInfo,
        registerUser,
        loginUser,
        registerError,
        loginError,
        isRegisterLoading,
        isLoginLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
