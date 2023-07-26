import React, { useEffect, useState } from 'react'
import { useGetRequest, usePostRequest } from '../../hooks/useApiCalls';
import Input from '../../components/Input';
import Select from '../../components/form-elements/Select';
import RadioGroup from '../../components/form-elements/RadioGroup';
import Button from '../../components/Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewForm = ({ id }) => {
  const [getRequest, error] = useGetRequest(`/get-form/${id}`);
  const [postRequest, err] = usePostRequest(`/save-response/${id}`)
  const schema = { title: 'Loading..', description: '', elements: [{ type: 'text', label: '', options: [] }] }
  const [form, setForm] = useState(schema);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({})


  const initializeFormData = (elements) => {
    const initialData = {};
    elements.forEach((element, index) => {
      initialData[element.label] = '';
    });
    setFormData(initialData);
  };

  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };
  const handleSaveResponse = async () => {
    const filteredData = [];
    for (let key in formData) {
      let data = { key: key, value: formData[key] }
      filteredData.push(data)
    }

    const response = await postRequest({ response: filteredData });
    if (err) {
      toast.error('Something Went Wrong !')
    }
    if (response) {
      navigate('/thanks/' + id)

    }




  }


  useEffect(() => {
    const getForm = async () => {
      const response = await getRequest();
      
      if (error) {
        toast.error('Something Went Wrong !')
      }

      if(!response){
        navigate('/not-found')
        return
      }
      setForm(response);

      initializeFormData(response.elements);




    }

    getForm()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-[60%] m-auto'>

      <div className='bg-lighColor border-t-[4px] border-themeColor p-4 '>
        <h1 className='text-[30px]'>{form.title}</h1>
        <p>{form.description}</p>
      </div>

      {form.elements.map((item, index) => {
        return <>

          {item.type === 'text' && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <p>{item.label}</p>

              <Input onChange={(e) => handleInputChange(item.label, e.target.value)} value={formData[item.label]} />

            </div>
          </>}
          {item.type === 'select' && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <Select options={item.options} label={item.label} onChange={(e) => handleInputChange(item.label, e.target.value)} />

            </div>
          </>}
          {item.type === 'radio' && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <RadioGroup options={item.options} label={item.label} onChange={(e) => handleInputChange(item.label, e.target.value)} />
            </div>
          </>}
        </>


      })}
      <div className='my-4'>

        <Button text='save response' onClick={handleSaveResponse} />
      </div>
    </div>
  )
}

export default ViewForm;