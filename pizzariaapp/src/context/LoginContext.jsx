import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";

const logincontext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    try{
      axios.post("http://localhost:3000/api/logout",{},{withCredentials:true})
      setUser(null);
    }
    catch(error){
      console.log("Logout Failed",error);
    }
    
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/me",

        {
          withCredentials: true,
        },
      )

      .then((response) => {
        setUser(response.data.user);
      })

      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <logincontext.Provider
      value={{ user, setUser, logout, isAuthenticated: !!user }}
    >
      {children}
    </logincontext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLogin = () => useContext(logincontext);
