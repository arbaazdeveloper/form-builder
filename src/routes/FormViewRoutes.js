import React from 'react'
import { useParams } from 'react-router-dom'


const FormViewRoutes = () => {
    const id=useParams()
  return (
    <div>
  <h1>Hi iam form  with id {id.id}</h1>
    </div>
  )
}

export default FormViewRoutes