import JWT from "jsonwebtoken";
const  ASD = "olol"
export default {
    sing: (payload) => JWT.sign(payload, ASD),
    verify: (access_token) => JWT.verify(access_token, ASD)
}







