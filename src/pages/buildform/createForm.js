import React, { useState } from 'react'
import Input from '../../components/Input'
import Description from '../../components/Description'
import Button from '../../components/Button'
import FormBuilder from './FormBuilder'

const CreateForm = () => {
   
    const schema = { title: '', descrition: '', elements: [{ type: 'text', label: '', options: [] }] }
    const [created, setcreated] = useState(false);
    const [form, setFrom] = useState(schema);


    const handleTitleChange = (e) => {
        setFrom({ ...form, title: e.target.value })

    }
    const handleDescriptionChange = (e) => {
        setFrom({ ...form, descrition: e.target.value })
    }
    const handleCreateForm = () => {
        setcreated(true)
    }
    return (
        <div className='w-full'>
            {created ? <>
                <FormBuilder form={form} setForm={setFrom} />

            </>
                : <>
                    <Input value={form.title} onChange={handleTitleChange} />
                    <Description value={form.descrition} onChange={handleDescriptionChange} />
                    <Button onClick={handleCreateForm} text={'Create Form'} />
                </>}
        </div>
    )
}

export default CreateForm