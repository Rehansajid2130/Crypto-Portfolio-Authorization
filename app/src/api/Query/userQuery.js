const USER_URL = "/user"

import Axios from "../axios"

export const UserSignIn = async ({password , email}) =>{
    try {
        const {data} = await Axios.post(`${USER_URL}/signin`,{password, email})
        return data;
    } catch (error) {
        throw Error(error.response.data?.message || "login failed")
    }
}
export const Usersignup = async ({password , email , firstName , lastName}) =>{
    try {
        const response = await Axios.post(`${USER_URL}/signup`,
            {password , email , firstName , lastName})
            return await response.data;
        } catch (error) {
            const message =
              error.response?.data?.message ||
              error.message ||
              "Signup failed";
            throw new Error(message);
          }
}
export const sendVerificationMail = async ({ email }) =>{
    try {
        const response = await Axios.post(`${USER_URL}/send-verification-mail`,
            {email})
            return await response.data;
        }catch (error) {
            const message =
              error.response?.data?.message ||
              error.message ||
              "verification failed";
            throw new Error(message);
          }
}
export const sendForgertMail = async ({ email }) =>{
    try {
        const response = await Axios.post(`${USER_URL}/forgot-password`,
            {email})
            return await response.data;
        }catch (error) {
            const message =
              error.response?.data?.message ||
              error.message ||
              "verification failed";
            throw new Error(message);
          }
}
export const verifyusermail = async ({ token }) =>{
    try {
        const response = await Axios.post(`${USER_URL}/verfiy-user-mail`,
            {token})
            return await response.data;
        }catch (error) {
            const message =
              error.response?.data?.message ||
              error.message ||
              "verification failed";
            throw new Error(message);
          }
}

export const verifyReset = async ({ token , password}) =>{
    try {
        const response = await Axios.post(`${USER_URL}/verify-forgot-mail`,
            {token , password})
            return await response.data;
        }catch (error) {
            const message =
              error.response?.data?.message ||
              error.message ||
              "verification failed";
            throw new Error(message);
          }
}