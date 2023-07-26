import React from 'react'
import { useParams } from 'react-router-dom'
import ViewForm from '../pages/ViewForm/ViewForm'


const FormViewRoutes = () => {
    const formId=useParams()
  return (
    <>
    <ViewForm id={formId.id}/>
    </>
  )
}

export default FormViewRoutes