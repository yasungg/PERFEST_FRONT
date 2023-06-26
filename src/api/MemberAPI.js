import axios from "axios";



const KH_DOMAIN = "http://localhost:8111";



const MemberAPI = {

    // 이메일로 특정회원 조회
    getMemberInfo: async(email) => {
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

    // 회원 탈퇴
    deleteMem: async(email) => {
        const deleteMem = {
            email: email
        };
        return await axios.get(KH_DOMAIN + "/del", deleteMem);
    },

    // 주소 수정 중복값 체크
    addRegCheck: async(address) => {
        return await axios.get(KH_DOMAIN + `/addressCheck?address=${address}`);
    },

    // 주소 수정
    updateAdd: async(email, address) => {
        const updateAdd = {
            email: email,
            address: address
        };
        return await axios.post(KH_DOMAIN + "/updateAdd", updateAdd);
    },

    // 이미지 수정
    updateImg: async(email, img) => {
        const updateImg = {
            email: email,
            img: img
        };
        return await axios.post(KH_DOMAIN + "updateImg", updateImg)
    },

    // 



    

}
export default MemberAPI;
