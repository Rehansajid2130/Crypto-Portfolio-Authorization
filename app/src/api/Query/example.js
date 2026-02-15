
import Axios from "../axios"

export const example = async () =>{
    try {
        const {data} = Axios.get('/')
    } catch (error) {
        throw Error(Error.response.data.message)
    }
}