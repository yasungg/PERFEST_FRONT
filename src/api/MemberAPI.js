import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const MemberAPI = {

    // 이메일로 특정회원 조회
    getMemberInfo: async(email) => {
        return await axios.get(KH_DOMAIN + `/auth/member/email?email=${email}`);
    },
    
    // 회원 닉네임 수정
    updateNicName: async(email, nickname) => {
        const updateData = {
            username: email,
            nickname: nickname
        };
        return await axios.post(KH_DOMAIN + "/auth/member/nickname", updateData);
    },

    // 닉네임 수정 중복값 체크
    nickNameRegCheck: async(nicknameCheck) => {
        return await axios.get(KH_DOMAIN + `/auth/member/nicknameCheck?nicname=${nicknameCheck}`);
    },

    // 회원 탈퇴
    deleteMem: async(email) => {
        const deleteMem = {
            username: email
        };
        return await axios.post(KH_DOMAIN + "/auth/member/del", deleteMem);
    },
    
    // 주소 수정
    updateAdd: async(email, address) => {
        const updateData = {
            username: email,
            address: address
        };
        return await axios.post(KH_DOMAIN + "/auth/member/updateAdd", updateData);
    },

    // 주소 수정 중복값 체크 (중복시 errorMsg)
    addRegCheck: async(email, address) => {
        return await axios.get(KH_DOMAIN + `/auth/member/addressCheck?email=${email}&address=${address}`);
      },
      

    // 이미지 수정
    updateImg: async(email, img) => {
        const updateData = {
            email: email,
            img: img
        };
        return await axios.post(KH_DOMAIN + "auth/member/updateImg", updateData)
    },

    // 



    

}
export default MemberAPI;
