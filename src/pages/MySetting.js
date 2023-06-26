import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin-top: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  width: 100%;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: orange;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const MySetting = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MemberAPI.MemberInfo(email);
        const data = response.data;
        setName(data.name);
        setAddress(data.address);
        setNickname(data.nickname);
      } catch (error) {
        console.error("ㅜㅜ", error);
      }
    };
    fetchData();
  }, [email]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 정보 업데이트 및 백엔드로 업데이트된 정보 전송하는 로직 구현예정> or 바뀔수도.... 고민중
    
  };

  return (
    <Container>
      <h2>내 정보</h2>
      <Form onSubmit={handleFormSubmit}>
        <Label>이메일</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled // 이메일은 수정 불가능
        />

        <Label>이름</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label>주소</Label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Label>닉네임</Label>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <Button type="submit">저장</Button>
      </Form>
    </Container>
  );
};

export default MySetting;
