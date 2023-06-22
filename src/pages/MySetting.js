import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
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
    
    const [email, setEmail] = useState("qhwkal1@naver.com");
    const [password, setPassword] = useState("******");
    const [name, setName] = useState("김정민");
    const [address, setAddress] = useState("천안시 불당동 불당아이파크 xxx동 yyyy호");
    const [nickname, setNickname] = useState("잼뮈");
    const [passwordCheck, setPasswordCheck] = useState("");


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // 정보업데이트 할 예정
    };

    return (
        <Container>
        <h2>내 정보 수정</h2>
        <Form onSubmit={handleFormSubmit}>
            <Label>이메일</Label>
            <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Label>비밀번호</Label>
            <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Label>Name</Label>
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