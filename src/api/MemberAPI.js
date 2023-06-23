import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const MemberAPI = {
    // 이메일로 특정회원 조회
    MemberInfo: async(email) => {
        return await axios.get(KH_DOMAIN + `/member/email?email=${email}`)
    },
    
    // 회원 탈퇴 (member status N -> Y)
    

}
export default MemberAPI;
