import React, { useState } from 'react'
import Input from '../../components/Input'
import Description from '../../components/Description'
import Button from '../../components/Button'
import FormBuilder from './FormBuilder'

import { toast } from 'react-hot-toast'
import { usePostRequest } from '../../hooks/useApiCalls'

const CreateForm = () => {
   
    const schema = { title: '', description: '', elements: [{ type: 'text', label: '', options: [] }] }
    const [created, setcreated] = useState(false);
    const [form, setFrom] = useState(schema);
    const [postRequest, error] = usePostRequest('/create-form');


    const handleTitleChange = (e) => {
        setFrom({ ...form, title: e.target.value })

    }
    const handleDescriptionChange = (e) => {
        setFrom({ ...form, description: e.target.value })
    }
    const handleCreateForm = () => {
        if(form.title===''){
            toast.error('Name cannot be empty !');
            return
        }
        setcreated(true)
    }
    const handleSave = async () => {

        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].label === '') {
                toast.error('Question Cannot be empty !')
                return
            }
        }
       
        toast('Saving...')
        const response = await postRequest(form);


        if (error) {
            console.log(error)
            return toast.error('Something Went Wrong !')
        }




        if (response.message === 'form created') {
            toast.success('form created sucessfully !')
        }

    }
    return (
        <div className='w-full'>
            {created ? <>
                <FormBuilder form={form} setForm={setFrom} onSave={handleSave} />

            </>
                : <>
                    <Input value={form.title} onChange={handleTitleChange} />
                    <Description value={form.description} onChange={handleDescriptionChange} />
                    <Button onClick={handleCreateForm} text={'Create Form'} />
                </>}
        </div>
    )
}

export default CreateForm