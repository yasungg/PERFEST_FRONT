import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [title, setTitle] = useState("test")
  const [value, setValue] = useState(2000);
  const [total, setTotal] = useState(2000);
  const [tax, setTax] = useState(0);
  const [isPaySuccess, setIsPaySuccess] = useState("false");

  
  return(
    <UserContext.Provider value={{title, setTitle, value, setValue, total, setTotal, tax, setTax, isPaySuccess, setIsPaySuccess}}>
    {props.children}
  </UserContext.Provider>
  )
}

export default UserStore;
