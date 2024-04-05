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

  console.log("user",user);

  useEffect(() => {

    const user = localStorage.getItem("User") // get from localStorage
    setUser(JSON.parse(user || null)); // set user

  },[]);


  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
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
  }, [ registerInfo ]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User"); // Remove local strogae data
    setUser(null); // set User to null
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
