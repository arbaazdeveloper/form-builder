import React, { useState } from 'react'
import Button from './Button'
import Lightbutton from './Lightbutton'
import { ShareIcon } from '../assets/Icons'
import Modal from './Modal'
import { toast } from 'react-hot-toast'
import { frontEnd } from '../urls/BackendUrls'

const Formbox = ({ title, button, onClick, formId }) => {
  const shareLink=`${frontEnd}/view-form/${formId}`
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    console.log('i ran')

    if (isOpen) {

      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    toast.success('Copied to clipboard !')

  }
  return (
    <div className='w-[80vw] bg-lighColor flex sm:w-full p-4 items-center justify-between rounded-[10px]'>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <Button onClick={onClick} text={button} />
        <Lightbutton onClick={handleModal} text={'Share'} icon={<ShareIcon />}>Share</Lightbutton>

      </div>
      <Modal isOpen={isOpen} onClose={handleModal}>
        <div className='w-[400px] border-b border-t flex flex-col py-2 my-4'>
          <input type='text' className='p-2 border rounded m-2' readOnly value={shareLink} />

          <div className='flex gap-[5px] '>
            <button onClick={handleCopy} type="button" className="px-5 mb-2 py- text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Copy</button>
            <Lightbutton text={'Cancel'} onClick={handleModal}></Lightbutton>
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default Formbox