import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {UserContext} from "../context/UserStore";

const Payment = () => {
  const context = useContext(UserContext);
  const [data, setData] = useState({
    next_redirect_pc_url: "",
    tid: "",
    params: {
        // 가맹점 코드
        cid: "TC0ONETIME",
        // 가맹점 주문번호
        partner_order_id: "partner_order_id",
        // 가맹점 회원 id
        partner_user_id: "partner_user_id",
        // 상품 이름
        item_name: context.title,
        // 상품 수량
        quantity: context.value,
        // 총 가격
        total_amount: context.total,
        // 상품 비과세
        tax_free_amount: context.tax,
        // 결제 성공 URL
        approval_url: "http://localhost:3000/payresult",
        // 결제 실패 URL
        fail_url: "http://localhost:3000/resultfalse",
        // 결제 취소 URL
        cancel_url: "http://localhost:3000/resultfalse"
    }
  })

  return(
    <>
    </>
  )
}

export default Payment;