import React, { useEffect, useState } from 'react'
import { useGetRequest } from '../../hooks/useApiCalls';
import { toast } from 'react-hot-toast';
import Formbox from '../../components/Formbox';
import { useNavigate } from 'react-router-dom';

const FormResponsesList = () => {
  const [getRequest, error] = useGetRequest('/get-all-forms')
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const setEditForm = (id) => {
    navigate('/responses/' + id)

  }
  useEffect(() => {
    const getForms = async () => {

      setForms(await getRequest());
      if (error) {
        toast.error('Something Went Wrong!')
      }
      setLoading(false)
    }
    getForms();

  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='flex flex-col w-full gap-[5px]'>
    {loading && <h1 className='text-center text-[30px]'>Loading...</h1>}
    {!loading && forms.length === 0 && <h1 className='text-center text-[30px]'>No Forms Found</h1>}
    {forms.map((form) => <Formbox title={form.title} key={form._id} button={'View Response'} onClick={() => setEditForm(form._id)} />)}
  </div>
  )
}

export default FormResponsesList