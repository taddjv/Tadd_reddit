import { useState, createContext, useContext } from "react";
export const UserPopContext = createContext();
export const usePop = () => useContext(UserPopContext);

export default function UserPopProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [dropUser, setDropUser] = useState(false);
  const [commentSort, setCommentSort] = useState("Newest");
  return (
    <UserPopContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignin,
        setShowSignin,
        dropUser,
        setDropUser,
        showCommunity,
        setShowCommunity,
        commentSort,
        setCommentSort,
      }}
    >
      {children}
    </UserPopContext.Provider>
  );
}
