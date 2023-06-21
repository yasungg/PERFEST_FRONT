import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [tax, setTax] = useState("");

  
  return(
    <UserContext.Provider value={{title, setTitle, value, setValue, total, setTotal, tax, setTax}}>
    {props.children}
  </UserContext.Provider>
  )
}

export default UserStore;

