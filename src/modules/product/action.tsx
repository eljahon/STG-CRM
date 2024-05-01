import React from 'react'
import GlobalFrom from '../../ui/form/global-from'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

export default function ProductAction() {
  const {id} = useParams()
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div>
     <GlobalFrom 
        handleSubmit={handleSubmit}
        reset={reset} 
        url={'post'}
        id={id} 
        type={id == "new" ?"post":"put"}
      >
     <div className="flex flex-wrap align-items-center mb-3 gap-2">
    <label htmlFor="username" className="p-sr-only">Username</label>
        <InputText id="username" placeholder="Username" className="p-invalid mr-2" />
        {/* { false && <Message severity="error" text="Username is required" />} */}
    </div>
     </GlobalFrom>
    </div>
  )
}
