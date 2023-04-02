import { useState, createContext, useContext } from "react";
export const CommentContext = createContext();
export const useComment = () => useContext(CommentContext);

export default function CommentProvider({ children }) {
  const [drop, setDrop] = useState(false);
  return (
    <CommentContext.Provider value={{ drop, setDrop }}>
      {children}
    </CommentContext.Provider>
  );
}
