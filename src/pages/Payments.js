import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {UserContext} from "../context/UserStore";

const Payment = () => {
  const context = useContext(UserContext);

  // 카카오페이로 보내려는 데이터 작성
  const [data, setData] = useState({
    next_redirect_pc_url: "",
    // 결제 한 건에 대한 고유번호, 결제 준비 API가 성공적으로 호출되면 발급,
    tid: "",
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
        approval_url: "https://developers.kakao.com/success",
        // 결제 실패 URL
        fail_url: "https://developers.kakao.com/fail",
        // 결제 취소 URL
        cancel_url: "https://developers.kakao.com/cancel"
    }
  });

  // 결제 준비 API를 통해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(TID)를 받는 단계. 
  // 어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청.
  useEffect(() => {
    const { params } = data;
    axios({
        url: "https://kapi.kakao.com/v1/payment/ready",
        method: "POST",
        headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_ADMIN_KEY}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        bodys: params,
    }).then(response => {
      // 요청이 성공하면 응답 본문에 JSON 객체로 다음 단계 진행을 위한 값들을 받습니다. 
      // 서버(Server)는 tid를 저장하고, 클라이언트는 사용자 환경에 맞는 URL로 리다이렉트
      const {
          data: { next_redirect_pc_url, tid }, // next_redirect_pc_url : 결제 준비 API 응답으로 받으며, PC 환경에서 사용. 
      } = response;
      // useContext 에 reponse 값을 저장.
      setData({ next_redirect_pc_url, tid });
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
    }, []);
      
      // 카카오페이에 결제 승인을 요청하는 실질적인 로직.
      // 사용자가 카카오톡 결제 화면에서 결제수단을 선택하고 비밀번호 인증까지 마치면, 
      // 결제 대기 화면은 결제 준비 API 요청 시 전달 받은 approval_url에 pg_token 파라미터를 붙여 리다이렉트합니다. 
      // pg_token은 결제 승인 API 호출 시 사용
      // useEffect(() => {
      //   // data 안에 params를 가져옴
      //     const { params } = data;
      //     axios({
      //         url: "https://kapi.kakao.com/v1/payment/approve",
      //         method: "POST",
      //         headers: {
      //             Authorization: `KakaoAK c0332c38956e87a5d78e40672fa94c9d`,
      //             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      //         },
      //         params,
      //     }).then(response => {
      //       // 응답을 받으면 위에 백에다 보낼 정보를 세팅해줌
      //         // setPayment((state) => ({
      //         //   ...state,
      //         //   // 티켓 기본 가격 정보를 따로 안넘겨줘서 총 가격 / 수량
      //         //   price : response.data.amount.total / response.data.quantity,
      //         //   // 총 가격
      //         //   total : response.data.amount.total,
      //         //   // 수량
      //         //   quantity : response.data.quantity,
      //         //   // 결제 고유번호
      //         //   tid : response.data.tid,
      //         //   // 카카오 비과세
      //         //   kakaoTaxFreeAmount : response.data.amount.tax_free,
      //         //   // CARD OR MONEY 둘 중 하나의 방식이면 백에서 받을 때 KAKAOPAY라고 알려주기 위하여 KAKAOPAY로 변환해서 넘겨줌 둘 다 아니면 에러
      //         //   method : response.data.payment_method_type === 'CARD' || response.data.payment_method_type === 'MONEY' ? 'KAKAOPAY' : 'ERROR'
      //         // }));
      //         console.log("결제 성공");
      //         // 나중에 전에 url로 다시 이 결제로 돌아올 수 있는 상황을 대비해 url 삭제
      //         window.localStorage.removeItem('url');
      //     }).catch(error => {
      //         // 실패하면 결제 고유번호를 지워줌 똑같은 중복 결제 방지 위랑 비슷하다.
      //         window.localStorage.removeItem('tid');
      //         console.log(error);
      //     });
      // }, []);
  
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
                  <img src={process.env.PUBLIC_URL + "/images/TCAT_01.png"} style={{width: '500px', margin: '20px 0'}} alt='TCAT'></img>
                  <h3>창을 닫으시면 자동으로 메인페이지로 돌아갑니다.</h3>
              </div>
          );
      };


  return(
    <>
    </>
  )
}

export default Payment;