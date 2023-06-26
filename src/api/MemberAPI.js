import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const MemberAPI = {
    // 이메일로 특정회원 조회
    MemberInfo: async(email) => {
        return await axios.get(KH_DOMAIN + `/member/email?email=${email}`);
    },
    
    // 회원 닉네임 수정
    updateNicName: async(email, nicName) => {
        const updateNicName = {
            email: email,
            nicName: nicName
        };
        return await axios.post(KH_DOMAIN + "/updateNicName", updateNicName);
    },
    // 닉네임 수정 중복값 체크
    nickNameRegCheck: async(nicName) => {
        return await axios.get(KH_DOMAIN + `/nicNameCheck?nicName=${nicName}`);
    },

    

}
export default MemberAPI;
