import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {UserContext} from "../context/UserStore";
import { Navigate } from "react-router-dom";
import PayModal from "./PaymentModal";

const PayReady = () => {
  const context = useContext(UserContext);
  const [payment, setPayment] = useState("");

  // 카카오페이로 보내려는 데이터 작성
  const [data, setData] = useState({
    next_redirect_pc_url: 1,
    // 결제 한 건에 대한 고유번호, 결제 준비 API가 성공적으로 호출되면 발급,
    tid: 1,
    params: {
        // 가맹점 코드
        cid: "TC0ONETIME",
        // 가맹점 주문번호
        partner_order_id: "partner_order_id",
        // 가맹점 회원 id
        partner_user_id: "partner_user_id",
        // 상품 이름
        item_name: "test",
        // 상품 수량
        quantity: 1,
        // 총 가격
        total_amount: (2000).toString(),
        // 상품 비과세
        tax_free_amount: 0,
        // 결제 성공 URL
        approval_url: "http://localhost:3000/success",
        // 결제 실패 URL
        fail_url: "http://localhost:3000/success",
        // 결제 취소 URL
        cancel_url: "http://localhost:3000/success"
    }
  });

  // 결제 준비 API를 통해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(TID)를 받는 단계. 
  // 어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청.
  useEffect(() => {
    const { params, next_redirect_pc_url, tid } = data;
    axios({
        url: "https://kapi.kakao.com/v1/payment/ready",
        method: "POST",
        headers: {
            Authorization: `KakaoAK 632fb98346e85fd6ea660b71beaf9b70`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        params,
    }).then(response => {
      // 요청이 성공하면 응답 본문에 JSON 객체로 다음 단계 진행을 위한 값들을 받습니다. 
      // 서버(Server)는 tid를 저장하고, 클라이언트는 사용자 환경에 맞는 URL로 리다이렉트
      const {
          data: { next_redirect_pc_url, tid }, // next_redirect_pc_url : 결제 준비 API 응답으로 받으며, PC 환경에서 사용. 
      } = response;
      // 결제 고유번호 tid를 저장
      window.localStorage.setItem("tid", tid);
      // 결제 페이지를 위한 url을 저장 모달 3번에서 버튼 클릭 시 불러줌
      window.localStorage.setItem('url', next_redirect_pc_url);
      console.log("통신 : " + JSON.stringify(response) );
      // useContext 에 reponse 값을 저장.
      setData({next_redirect_pc_url : next_redirect_pc_url, 
              tid : tid});
      // console.log("결제 성공시 받는 response 값 : " + response);
      console.log("PayReady 메소드 실행 성공");
      
      // 실행 성공하면 pg토큰 발급을 위해 해당 주소로 리다이렉트
      // 페이지 이동 없이 모달창에서 구현할 예정
      window.localStorage.setItem("paymentResult", "success");
    }).catch(error => {
      console.log(error);
      // navigate("/fail-page");
      // 결제 준비 통신 실패할 경우 이동할 페이지 정해줘야 함

    });
  }, []);


  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    console.log(modalOpen);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    const result = window.localStorage.getItem("paymentResult");
    // 결제 승인 통신 성공 시 모달창 열기
    if (result === "success") {
      openModal();
    } else if(result === "fail") {
      closeModal();
    }
  }, []);


  
  return(
    <div>
      {modalOpen && <PayModal open={openModal} close={closeModal} />}
    </div>
  )
}
      
// 카카오페이에 결제 승인을 요청하는 실질적인 로직.
// 사용자가 카카오톡 결제 화면에서 결제수단을 선택하고 비밀번호 인증까지 마치면, 
// 결제 대기 화면은 결제 준비 API 요청 시 전달 받은 approval_url에 pg_token 파라미터를 붙여 리다이렉트합니다. 
// pg_token은 결제 승인 API 호출 시 사용
const PayResult = () => {
  console.log("PayResult 메소드 실행");

  // 초기값 셋팅, 결제준비에서 받아온 tid 셋팅
  const [payment, setPayment] = useState({
    // 가격
    price : 0,
    // 총 가격
    total : 0,
    // 수량
    quantity : 0,
    // 카카오 비과세 취소할 때 필요해서 결제할 때 백에다 정보를 넘겨주고 취소할 때 필요하면 다시 받아서 취소
    kakaoTaxFreeAmount : 0,
    // 위에서 받아옴
    tid : window.localStorage.getItem('tid'),
    // 결제 타입
    method : ""
  });
  // 결제준비 api 통신 성공시 받아온 tg_token 받기
  let search = window.location.search;

  // 카카오페이 결제 승인 요청에 보낼 정보
  const data = {
    params: {
      // 가맹점 번호
      cid: "TC0ONETIME",
      // 결제 고유번호
      tid : payment.tid,
      partner_order_id: "partner_order_id",
      // 가맹점 회원 id
      partner_user_id: "partner_user_id",
      // 결제승인 요청을 인정하는 토큰
      pg_token: search.split("=")[1],
    }
  };

  useEffect(() => {
  const { params } = data;
  axios({
    url: "https://kapi.kakao.com/v1/payment/approve",
    method: "POST",
    headers: {
      Authorization: `KakaoAK 632fb98346e85fd6ea660b71beaf9b70`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    params,
  }).then(response => {
  // 응답을 받으면 위에 백에다 보낼 정보를 세팅해줌
  setPayment((state) => ({
    ...state,
    // 티켓 기본 가격 정보를 따로 안넘겨줘서 총 가격 / 수량
    price : response.data.amount.total / response.data.quantity,
    // 총 가격
    total : response.data.amount.total,
    // 수량
    quantity : response.data.quantity,
    // 결제 고유번호
    tid : response.data.tid,
    // 카카오 비과세
    kakaoTaxFreeAmount : response.data.amount.tax_free,
    // CARD OR MONEY 둘 중 하나의 방식이면 백에서 받을 때 KAKAOPAY라고 알려주기 위하여 KAKAOPAY로 변환해서 넘겨줌 둘 다 아니면 에러
    method : response.data.payment_method_type === 'CARD' || 
            response.data.payment_method_type === 'MONEY' ? 'KAKAOPAY' : 'ERROR'
  }));
  console.log("결제 성공");
  // 나중에 전에 url로 다시 이 결제로 돌아올 수 있는 상황을 대비해 url 삭제
  window.localStorage.removeItem('url');

  // window.localStorage.setItem("paymentResult", "success");
  }).catch(error => {
    // 실패하면 결제 고유번호를 지워줌 똑같은 중복 결제 방지 위랑 비슷하다.
    window.localStorage.setItem("paymentResult", "fail");
    console.log(window.localStorage.getItem("paymentResult"));
    window.localStorage.removeItem('tid');
    console.log(error);
  });
  }, []);
}


   
  
      // 백에다 보내는 실질적인 로직 일단 카카오에서 승인이 받았기에 웬만하면 그 값 그대로 넘겨주기에 백엔드에도 문제가 없이 값이 잘 넘어간다
    // useEffect(() => {
    //   // 비동기 통신
    //   const PayReadySubmit = async () => {
    //     try {
    //       // 위에 정보
    //       const response = await PayApi.payReady(user.userIndex, seatIndex, payment.quantity, payment.price, user.userPoint, payment.method, payment.tid, payment.total, payment.kakaoTaxFreeAmount);
    //       // 200이면 결제 tid 다시 지워줌 어차피 DB에 TID값이 저장됨
    //       if(response.data.statusCode === 200) {
    //         window.localStorage.removeItem('tid');
    //       }
    //     } catch (e) {
    //       // 마찬가지로 실패여도 지워준다
    //       window.localStorage.removeItem('tid');
    //       console.log(e);
    //     }
    //   }
    //   // 이게 뭐냐면 혹시 카카오페이에서는 승인이 실패할 수도 있는데 백에만 정보가 넘어가면 안되기에 위에서 먼저 카카오페이가 성공이면 TRUE 값이 넘오와서 그 때만 실행되게 하였다
    //   isTrue && PayReadySubmit();
    // }, [isTrue, seatIndex, payment, user]);
  
      // 결제 완료 모달
    const Body = () => {
      return(
        <div>
            <h1>결제가 정상 진행 되었습니다.</h1>
            <h3>창을 닫으시면 자동으로 메인페이지로 돌아갑니다.</h3>
        </div>
      );
    };

export {PayReady, PayResult};