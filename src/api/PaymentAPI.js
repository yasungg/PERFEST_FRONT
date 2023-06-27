import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const PaymentAPI = {
  PaymentSubmit: async(id, price, quantity, tid, kakaoTaxFreeAmount) => {
    const info = {
      memberId: id,
      price: price,
      quantity: quantity,
      tid: tid,
      tax_free: kakaoTaxFreeAmount
    };
    return await axios.post(KH_DOMAIN + "/payment" + info);
  }
}


export default PaymentAPI;