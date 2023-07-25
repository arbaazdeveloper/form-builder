import React from 'react'
import { useParams } from 'react-router-dom'
import ViewForm from '../pages/ViewForm/ViewForm'


const FormViewRoutes = () => {
    const id=useParams()
  return (
    <>
    <ViewForm id={id.id}/>
    </>
  )
}

export default FormViewRoutes