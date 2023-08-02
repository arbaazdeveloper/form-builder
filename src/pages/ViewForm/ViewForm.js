import React, { useEffect, useState } from 'react'
import { useGetRequest, usePostRequest } from '../../hooks/useApiCalls';
import Input from '../../components/Input';
import Select from '../../components/form-elements/Select';
import RadioGroup from '../../components/form-elements/RadioGroup';
import Button from '../../components/Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import CategorizeRenderer from '../../components/Formrenderelements/CategorizeRenderer';

const ViewForm = ({ id }) => {
  const [getRequest, error] = useGetRequest(`/get-form/${id}`);
  const [postRequest, err] = usePostRequest(`/save-response/${id}`)
  const schema = { title: 'Loading..', description: '', elements: [{ type: 'text', label: '', options: [] }] }
  const [form, setForm] = useState(schema);
  const [open, setOpen] = useState(false);
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
    setOpen(true)
    const filteredData = [];
    for (let key in formData) {
      let data = { key: key, value: formData[key] }
      filteredData.push(data)
    }

    const response = await postRequest({ response: filteredData });
    setOpen(false)
    if (err) {
      toast.error('Something Went Wrong !')
    }
    if (response) {
      navigate('/thanks/' + id)

    }




  }
  const inputType = {
    TEXT: 'text',
    SELECT: 'select',
    RADIO: 'radio',
    COMPREHENSION: 'comprehension',
    CATEGORIZE: 'categorize',
    CLOZE: 'cloze'
  }


  useEffect(() => {
    const getForm = async () => {
      const response = await getRequest();

      if (error) {
        toast.error('Something Went Wrong !')
      }

      if (!response) {
        navigate('/not-found')
        return
      }
      setForm(response);

      initializeFormData(response.elements);
      console.log(form)




    }

    getForm()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-[60%] m-auto'>

      <div className='bg-lighColor border-t-[4px] border-themeColor p-4 '>
        <div className='flex gap-[10px]'>
          <img className='h-[100px] w-[100px] rounded-full' src={form.image} alt='logo' />
          <div>

            <h1 className='text-[30px]'>{form.title}</h1>
            <p>{form.description}</p>
          </div>
        </div>
      </div>

      {form.elements.map((item, index) => {
        return <>

          {item.type === inputType.TEXT && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <p>{item.label}</p>

              <Input onChange={(e) => handleInputChange(item.label, e.target.value)} value={formData[item.label]} />

            </div>
          </>}
          {item.type === inputType.SELECT && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <Select options={item.options} label={item.label} onChange={(e) => handleInputChange(item.label, e.target.value)} />

            </div>
          </>}
          {item.type === inputType.RADIO && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <RadioGroup options={item.options} label={item.label} onChange={(e) => handleInputChange(item.label, e.target.value)} />
            </div>
          </>}
          {item.type === inputType.CATEGORIZE && <>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
              <p>{item.label}</p>
              <CategorizeRenderer data={form.extras[index]} />
            </div>
          </>}


        </>


      })}
      <div className='my-4'>

        <Button text='save response' onClick={handleSaveResponse} />
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h1 className='text-[20px]'>Saving Response Please Wait.....</h1>

      </Modal>
    </div>
  )
}

export default ViewForm;