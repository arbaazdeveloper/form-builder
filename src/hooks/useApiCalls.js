import axios from "axios"
import { url } from "../urls/BackendUrls"
import { useState } from "react"
export const usePostRequest = (endpoint, formData) => {


    const [error, setError] = useState('')
    const postRequest = async (data) => {
        try {

            const response = await axios.post(`${url}${endpoint}`, data);
            return response.data;

        } catch (error) {
            setError(error)
        }


    }
    return [postRequest, error];




}
export const useGetRequest = (endpoint) => {


    const [error, setError] = useState('')
    const getRequest = async () => {
        try {

            const response = await axios.get(`${url}${endpoint}`);
            return response.data;

        } catch (error) {
            setError(error)
        }


    }
    return [getRequest, error];




}
export const usePutRequest = (endpoint, formData) => {


    const [error, setError] = useState('')
    const putRequest = async () => {
        try {

            const response = await axios.put(`${url}${endpoint}`, formData);
            return response.data;

        } catch (error) {
            setError(error)
        }


    }
    return [putRequest, error];




}

const useDeleteRequest = () => {
  
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const deleteRequest = async (endpoint) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${url}${endpoint}`);
         
            
            setIsLoading(false);
            return response
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return [error, isLoading, deleteRequest];
};

export default useDeleteRequest;