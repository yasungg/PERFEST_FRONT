import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const LoginAPI = {
  Login: async (email, password) => {
    // 로그인
    const requestBody = {
      username: email,
      password: password,
    };
    const stringified = JSON.stringify(requestBody);

    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    console.log(Authorization);
    console.log(stringified);
    console.log(requestBody);

    return await axios
      .post(KH_DOMAIN + `/auth/member/login`, stringified, {
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      });
  },
  Logout: async () => {
    const Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/logout/bye`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Authorization,
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
      },
    });
  },
};
export default LoginAPI;
