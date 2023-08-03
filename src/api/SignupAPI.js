import axios from "axios";
const localhost = "http://localhost:8111"
const SignupAPI = {
  Signup: async (email, password, memberName, nickname) => {
    const requestBody = {
      username: email,
      password: password,
      memberName: memberName,
      nickname: nickname,
    };
    const stringified = JSON.stringify(requestBody);
    return await axios
      .post(localhost + "/auth/member/signup", stringified, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  KakaoSignup: async (email, password, memberName, nickname) => {
    const requestBody = {
      username: email,
      password: password,
      memberName: memberName,
      nickname: nickname,
    };
    const stringified = JSON.stringify(requestBody);
    return await axios
      .post(localhost + "/auth/member/kakaosignup", stringified, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
export default SignupAPI;
