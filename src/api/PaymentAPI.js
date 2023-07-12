import axios from "axios";

const localhost = "http://localhost:8111";

const PaymentAPI = {
  // 결제 완료 시 DB에 정보 저장하기 위한 메소드
  PaymentSubmit: async(memberid, productId, price, quantity, tid, kakaoTaxFreeAmount) => {
    const info = {
      memberId: memberid,
      productId: productId,
      price: price,
      quantity: quantity,
      tid: tid,
      tax_free: kakaoTaxFreeAmount
    };
    return await axios.post(localhost + "/auth/payment/regist", info);
  },

  // 결제 취소 시 사용자가 결제한 결제 정보가 있는지 DB에 가서 확인
  CheckPaymentData: async(memberId, productId, paymentId) => {
   return await axios.get(localhost + `/auth/payment/checkPaymentData?memberId=${memberId}&productId=${productId}&productId=${productId}&paymentId=${paymentId}`); 
  },

  // 카카오페이 api 결제 완료 시 DB에 있는 결제 정보를 삭제
  DeletePaymentData: async(memberId, productId, paymentId) => {
    const info = {
      memberId: memberId,
      productId: productId,
      paymentId: paymentId
    }
    return await axios.post(localhost + `/auth/payment/deletePaymentData?memberId=${memberId}&productId=${productId}&paymentId=${paymentId}`, info)
  }
}


export default PaymentAPI;