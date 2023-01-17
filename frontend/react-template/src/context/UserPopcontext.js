import { useState, createContext, useContext } from "react";
export const UserPopContext = createContext();
export const usePop = () => useContext(UserPopContext);

export default function UserPopProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [dropUser, setDropUser] = useState(false);
  return (
    <UserPopContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignin,
        setShowSignin,
        dropUser,
        setDropUser,
      }}
    >
      {children}
    </UserPopContext.Provider>
  );
}
