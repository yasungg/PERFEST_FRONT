import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const PaymentAPI = {
  toss: async(id, price) => {

    const info = {
      memberId: id,
      price: price,
    };
    return await axios.post(KH_DOMAIN + "/payment" + info);
  }
}


export default PaymentAPI;