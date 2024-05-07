import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import paramsToObject  from "../../hooks/paramsToObject"
import { AddData, UpdateData } from '../../service/global';
import { Button } from 'primereact/button';

interface IForm {
  children?: any,
  handleSubmit: () => any,
  reset?: () => any,
  setfile?:any,
  url: string,
  title?:string,
  navUrl?:string
}
export default function GlobalFrom({
    children,
    handleSubmit,
    reset,
    setfile,
    url,
    title,
    navUrl
  }:IForm)  {
    const {id} = useParams()
    const queryClient = useQueryClient()
    const [params, setSearchParams] = useSearchParams();
    const [loader,setLoader] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleAdd = async (data:any) => {
      setLoader(true)
      if (id == "new") {
          await AddData(url, data)
            .then((response) => {
              toast.success("seccessfully create")
              navigate(navUrl)
              reset()
            })
            .catch((error:any) => {
              toast.error(error?.response?.data?.message ||"Error creating")
            })
            .finally(()=> setLoader(false));
        } else  {
      await UpdateData(url, data, id)
        .then((response) => {
          toast.success("seccessfully update")
          setSearchParams({
            ...paramsToObject(params.entries()),
            openMadal: "",
          })
          navigate(navUrl)
          reset()
          if(setfile?.length){
            setfile(null)
          }
        })
        .catch((error) => {
          
          console.log(error)
          toast.error(error?.response?.data?.message)
        })
        .finally(()=> setLoader(false));
    }
  };
  return (
    <form  onSubmit={handleSubmit(handleAdd) }
    >
    <div className='flex w-full justify-content-between align-items-center px-4 py-1 my-2 my-4 mb-6 bg-white border-round-md'> 
      <h3>{title}</h3>
      <div className='flex gap-2 '>
      <Button label="Add" type='submit' />
      <Button label="Cancel" severity="secondary"  type='button'/>
      </div>
    </div>
      {children}
    </form>
  )
}
