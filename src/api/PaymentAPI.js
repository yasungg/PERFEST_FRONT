import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const PaymentAPI = {
  PaymentSubmit: async(memberid, productId, price, quantity, tid, kakaoTaxFreeAmount) => {
    const info = {
      memberId: 1,
      productId: 1,
      price: 2000,
      quantity: 1,
      tid: tid,
      tax_free: kakaoTaxFreeAmount
    };
    return await axios.post(KH_DOMAIN + "/payment/regist" + info);
  }
}


export default PaymentAPI;