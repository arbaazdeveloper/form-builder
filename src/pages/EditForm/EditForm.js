import React, { useEffect, useState } from 'react'
import Formbox from '../../components/Formbox'
import { useGetRequest } from '../../hooks/useApiCalls'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const EditForm = () => {
  const [getRequest, error] = useGetRequest('/get-all-forms')
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const setEditForm = (id) => {
    navigate('/edit-form/' + id)

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
      {!loading && forms.length === 0 && <h1 className='text-center text-[30px]'>No Forms To Edit</h1>}
      {forms.map((form) => <Formbox key={form._id} title={form.title} button={'Edit form'} onClick={() => setEditForm(form._id)} />)}
    </div>

  )
}

export default EditForm