import React, { useEffect, useState } from 'react'
import { useGetRequest, usePutRequest } from '../../hooks/useApiCalls'
import { useParams } from 'react-router-dom'
import FormBuilder from '../buildform/FormBuilder';
import { toast } from 'react-hot-toast';

const Editor = () => {
    const id = useParams();
    const schema = { title: 'Loading..', description: '', elements: [{ type: 'text', label: '', options: [] }] }
    const [form, setForm] = useState(schema)
    const [getRequest, error] = useGetRequest(`/get-form/${id.id}`);
    const [putRequest,err]=usePutRequest(`/update-form/${id.id}`,form);

    const handleUpdate=async()=>{
        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].label === '') {
                toast.error('Question Cannot be empty !')
                return
            }
        }
       
        toast('Saving...')
        const response = await putRequest();


        if (error) {
            console.log(error)
            return toast.error('Something Went Wrong !')
        }




        if (response.message === 'form updated') {
            toast.success('form updated sucessfully !')
        }
    }



    useEffect(() => {
        const getForm = async () => {
            const response = await getRequest();
            if (error) {
                toast.error('Something Went Wrong!')
            }
            setForm(response)
        }
        getForm()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <div className='w-full'>
                <FormBuilder form={form} setForm={setForm} onSave={handleUpdate} />
            </div>
        </>
    )
}

export default Editor