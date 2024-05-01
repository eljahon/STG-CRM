import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
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
  type?:string
  onedataId?: string,
  id?: string,

}
export default function GlobalFrom({
    children,
    handleSubmit,
    reset,
    setfile,
    url,
    onedataId,
    type,
    id,
  }:IForm)  {

    const queryClient = useQueryClient()
    const [params, setSearchParams] = useSearchParams();
    const [loader,setLoader] = useState<boolean>(false)
    const handleAdd = async (data:any) => {
      setLoader(true)
      if (type == "post") {
          await AddData(url, data)
            .then((response) => {
              toast.success("seccessfully create")
              queryClient.invalidateQueries([url])
              setSearchParams({
                ...paramsToObject(params.entries()),
                openMadal: "",
              })
              reset()
              if(setfile?.length){
                setfile(null)
              }
              
            
            })
            .catch((error:any) => {
              toast.error(error?.response?.data?.message ||"Error creating")

            })
            .finally(()=> setLoader(false));
        }
    if (type == "put") {
      await UpdateData(url, data, onedataId)
        .then((response) => {
          toast.success("seccessfully update")
          queryClient.invalidateQueries([url])
          setSearchParams({
            ...paramsToObject(params.entries()),
            openMadal: "",
          })
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
      {children}
      <Button label="Add" type='submit' />
      <Button label="Cancel" severity="secondary"  type='button'/>
    </form>
  )
}
