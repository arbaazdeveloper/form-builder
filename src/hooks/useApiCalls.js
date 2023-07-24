import axios from "axios"
import { url } from "../urls/BackendUrls"
import { useState } from "react"
export const usePostRequest = (endpoint,formData) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const postRequest = async () => {
        try {

            const response =await  axios.post(`${url}${endpoint}`, formData);
            setData(response.data)

        } catch (error) {
             setError(error)
        }
        finally{
            setLoading(false)

        }

    }
    return [postRequest,data,loading,error];




}