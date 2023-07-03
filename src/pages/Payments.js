import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {UserContext} from "../context/UserStore";
import { Navigator, useNavigate } from "react-router-dom";
import PaymentAPI from "../api/PaymentAPI";
import ResultFalse from "./PayResultFalse";

const PayReady = () => {
  const context = useContext(UserContext);

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
        approval_url: "http://localhost:3000/payresult",
        // 결제 실패 URL
        fail_url: "http://localhost:3000/resultfail",
        // 결제 취소 URL
        cancel_url: "http://localhost:3000/resultfail"
    }
  });

  const navigate = useNavigate();

  // 결제 준비 API를 통해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(TID)를 받는 단계. 
  // 어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청.
  useEffect(() => {
    const { params } = data;
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
      window.localStorage.setItem("tid", response.data.tid);
      // 결제 페이지를 위한 url
      window.localStorage.setItem('url', next_redirect_pc_url);
      console.log("통신 : " + JSON.stringify(response) );
      // useContext 에 reponse 값을 저장.
      setData({next_redirect_pc_url : next_redirect_pc_url, 
              tid : tid});
      console.log("PayReady 메소드 실행 성공");
      // 실행 성공하면 pg토큰 발급을 위해 해당 주소로 리다이렉트
      window.location.href = response.data.next_redirect_pc_url;

    }).catch(error => {
      console.log(error);
      window.localStorage.removeItem("tid");
      window.localStorage.removeItem("url");
      // 결제 준비 통신 실패할 경우 이동할 페이지 정해줘야 함
      navigate("/resultFail");
    });
  }, []);
}
      
// 카카오페이에 결제 승인을 요청하는 실질적인 로직.
// 사용자가 카카오톡 결제 화면에서 결제수단을 선택하고 비밀번호 인증까지 마치면, 
// 결제 대기 화면은 결제 준비 API 요청 시 전달 받은 approval_url에 pg_token 파라미터를 붙여 리다이렉트.
// pg_token은 결제 승인 API 호출 시 사용
const PayResult = () => {
  console.log("PayResult 메소드 실행");

  // 초기값 셋팅, 결제준비에서 받아온 tid 셋팅
  const [payment, setPayment] = useState({
    // 가격
    price : 0,
    // 수량
    quantity : 0,
    // 카카오 비과세 취소할 때 필요해서 결제할 때 백에다 정보를 넘겨주고 취소할 때 필요하면 다시 받아서 취소
    kakaoTaxFreeAmount : 0,
    // 위에서 받아옴
    tid : window.localStorage.getItem('tid'),
    // 결제 타입
    method : ""
  });
  // 결제준비 api 통신 성공시 받아온 pg_token 받기
  let search = window.location.search;
  let splitToken = search.split("=")[1];
  console.log("search 값 : "+search);
  console.log(splitToken);
  // ?pg_token=8bebbe14fde18da1dd3d
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
      pg_token: splitToken
    }
  };

  const navigate = useNavigate();
  const [isTrue, setIsTrue] = useState(false);
  
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
    console.log("결제 승인 완료 : " + JSON.stringify(response));
    // 여기까지 통신이 성공했으면 카카오 결제 API 는 완료
    // 응답을 받으면 위에 백에다 보낼 정보를 세팅해줌
    setPayment({
      // 총 가격
      price : response.data.amount.total,
      // 수량
      quantity : response.data.quantity,
      // 결제 고유번호
      tid : response.data.tid,
      // 카카오 비과세
      kakaoTaxFreeAmount : response.data.amount.tax_free
    }); 
    setIsTrue(true);
  }).catch(error => {
    // 실패하면 결제 고유번호와 url을 지워줌
    window.localStorage.removeItem("tid");
    console.log(error);
    navigate("/resultFail");
  }).finally(
    // 나중에 전에 url로 다시 이 결제로 돌아올 수 있는 상황을 대비해 url 삭제
    window.localStorage.removeItem('url')
  );
  },[]);

  useEffect(() => {
    // 결제 승인 완료 후 예약 정보를 백엔드에 보내는 로직
    // 결제 로직이 전부 성공한 뒤에 DB로 값을 넣게 하기 위해
    const PaymentResult = async() => {
      try {
        // const tid = window.localStorage.getItem("tid");
        const memberId = 1;
        const productId = 1;
        const response = await PaymentAPI.PaymentSubmit(memberId, productId, payment.price, payment.quantity, payment.tid, payment.kakaoTaxFreeAmount)
        console.log(response);
        if(response.status === 200) {
          navigate("/resultSuccess");
        }
      } catch (e) {
        console.log(e);
        
      } finally {
        // 백엔드 통신이 성공하면 DB에 tid 값이 저장되므로 tid 값을 삭제한다.
        window.localStorage.removeItem('tid');
      }
    };
    isTrue && PaymentResult();
  }, [isTrue])
};

// 카카오페이 결제 취소 함수
const PayCancel = ({memberId, productId}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    navigate('/', {replace:true});
  }

  // 사용자가 예약한 주문 내역이 있는지 확인
  const [memberData, setMemberData] = useState({
    data : {
      memberId : memberId,
      productId : productId,
      price : "",
      quantity : "",
      tid : "",
      tax_free : ""
    }
  });
  useEffect(() => {
    const getData = async() => {
      const respone = await PaymentAPI.CheckPaymentData(memberId, productId);
      if(respone.status === 200) {
        console.log("해당 상품 주문 데이터 확인");
        const {
          data : {price, quantity, tid, tax_free}
        } = respone;
        setMemberData({
          price : price,
          quantity : quantity,
          tid : tid,
          tax_free : tax_free
        });
      } else {
        console.log("해당 상품 주문 데이터 없음");
      }
    }
  }, []);

  const { data } = memberData;
  axios({
      url: "https://kapi.kakao.com/v1/payment/cancel",
      method: "POST",
      headers: {
        Authorization: `KakaoAK 632fb98346e85fd6ea660b71beaf9b70`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data,
  }).then(response => {
    // 요청이 성공하면 응답 본문에 JSON 객체로 다음 단계 진행을 위한 값들을 받습니다. 
    // 서버(Server)는 tid를 저장하고, 클라이언트는 사용자 환경에 맞는 URL로 리다이렉트
    const {
        data: { next_redirect_pc_url, tid }, // next_redirect_pc_url : 결제 준비 API 응답으로 받으며, PC 환경에서 사용. 
    } = response;
    // 결제 고유번호 tid를 저장
    window.localStorage.setItem("tid", response.data.tid);
    // 결제 페이지를 위한 url
    window.localStorage.setItem('url', next_redirect_pc_url);
    console.log("통신 : " + JSON.stringify(response) );
    // useContext 에 reponse 값을 저장.
    console.log("PayReady 메소드 실행 성공");

    // 실행 성공하면 pg토큰 발급을 위해 해당 주소로 리다이렉트
    window.location.href = response.data.next_redirect_pc_url;

  }).catch(error => {
    console.log(error);
    window.localStorage.removeItem("tid");
    window.localStorage.removeItem("url");
    // 결제 준비 통신 실패할 경우 이동할 페이지 정해줘야 함
    navigate("/resultFail");
  });
 

    return (
      <ResultFalse>
      </ResultFalse>
    )
  }


export {PayReady, PayResult, PayCancel};