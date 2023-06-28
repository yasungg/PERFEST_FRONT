import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const LoginAPI = {
  Login: async (email, password) => {
    const requestBody = {
      username: email,
      password: password,
    };
    const stringified = JSON.stringify(requestBody);
    return await axios
      .post(KH_DOMAIN + `/auth/member/login`, stringified, {
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
  KakaoLoign: async (email, password) => {
    const requestBody = {
      username: email,
      password: password,
    };
    const stringified = JSON.stringify(requestBody);
    return await axios
      .post(KH_DOMAIN + `/auth/member/kakaologin`, stringified, {
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
export default LoginAPI;
