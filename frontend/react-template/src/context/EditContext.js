import { useState, createContext, useContext } from "react";
export const EditContext = createContext();
export const useEdit = () => useContext(EditContext);

export default function EditProvider({ children }) {
  const [showUserPicEdit, setShowUserPicEdit] = useState(false);
  return (
    <EditContext.Provider
      value={{
        showUserPicEdit,
        setShowUserPicEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}
