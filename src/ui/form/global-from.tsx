import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import paramsToObject  from "../../hooks/paramsToObject"
import { AddData, UpdateData, UpdateDataOne } from '../../service/global';
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
              // reset()
            })
            .catch((error:any) => {
              toast.error(error?.response?.data?.error?.message)
            })
            .finally(()=> setLoader(false));
        }else if(id =="old"){
          await UpdateDataOne(url, data)
        .then((response) => {
          toast.success("seccessfully update")
        
          navigate(navUrl)
          if(setfile?.length){
            setfile(null)
          }
        })
        .catch((error) => {
          
          toast.error(error?.response?.data?.error?.message)
        })
        .finally(()=> setLoader(false));
        } else  {
      await UpdateData(url, data, id)
        .then((response) => {
          toast.success("seccessfully update")
      
          navigate(navUrl)
          reset()
          if(setfile?.length){
            setfile(null)
          }
        })
        .catch((error) => {
          
          toast.error(error?.response?.data?.error?.message)
        })
        .finally(()=> setLoader(false));
    }
  };
  return (
    <form  onSubmit={handleSubmit(handleAdd) }
    >
      <div className='flex w-full justify-content-between align-items-center  px-2  mt-5 mb-4'> 
      <h3 className="m-0 text-2xl">{title}</h3>
      <div className='flex gap-2  '>
      <Button className='border-round-3xl px-4' label="Add" type='submit'  severity="success" />
      <Button className='border-round-3xl px-4'  label="Cancel" severity="secondary"  type='button' onClick={()=> navigate(navUrl)}/>
      </div>
    </div>
      {children}
    </form>
  )
}

