import React from 'react'

const Button = ({onClick,text}) => {
  return (
    <button className="px-5 py-2.5 bg-themeColor  text-white rounded-lg hover:opacity-90 mr-4" onClick={onClick}>{text}</button>
  )
}

export default Button