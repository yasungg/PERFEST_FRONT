import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [title, setTitle] = useState("test")
  const [value, setValue] = useState(2000);
  const [total, setTotal] = useState(2000);
  const [tax, setTax] = useState(0);
  const [isPaySuccess, setIsPaySuccess] = useState("false");
  const [userEmail, setUserEmail] = useState("qhwkal1@naver.com");
  const [productId, setProductId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  
  return(
    <UserContext.Provider value={{userEmail, setUserEmail, title, setTitle, value, setValue, total, setTotal, tax, setTax, isPaySuccess, setIsPaySuccess, productId, setProductId, memberId, setMemberId, price, setPrice, quantity, setQuantity}}>
    {props.children}
  </UserContext.Provider>
  )
}

export default UserStore;

