import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { PanelMenu } from "primereact/panelmenu";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [open,setOpen] = useState(false)
    const [openmadal,setOpenmadal] = useState(false)
    const company = window.localStorage.getItem('company')
  
  useEffect(() => {
      window.addEventListener('click', ()=>setOpen(false));
  }, []);

  
  const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" outlined   onClick={()=>setOpenmadal(false)}  />
        <Button label="Yes" icon="pi pi-check" severity="danger"  onClick={()=>{
                        window.localStorage.clear('authToken')
                        window.location.reload();
                     }}  />
    </React.Fragment>
);

    return (
        <div className='flex align-items-center justify-content-between px-2' >
            <IconField className='w-full' iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText className="border-round-2xl  border-none" v-model="value1" placeholder="Search" />
            </IconField>

            <div className='flex align-items-center justify-content-end  gap-2 w-full'>
                <div className='p-3 pb-2   bg-white border-round-2xl cursor-pointer'>
                    <i className="pi pi-bell" style={{ fontSize: '1.2rem', color: 'black' }}></i>
                </div>
                <div onClick={(e)=>{
                    e.stopPropagation()
                    setOpen(!open)}
                } className='p-3  pb-2  bg-white border-round-2xl flex gap-2 align-items-center cursor-pointer relative' >
                    <i className="pi pi-user " style={{ fontSize: '1.2rem', color: 'black' }}></i>
                    <p className="m-0 mb-1">Evan Yates</p>
                    <i className="pi  pi-angle-down" style={{ fontSize: '1.2rem', color: 'black' }}></i>
                    <div className={`${open? "block":"hidden"} absolute  left-0 bg-white border-round-2xl  py-2 w-full`} style={{"top":"55px","zIndex":5}}>
                        <Link to={'/'} className="no-underline " style={{"color":"black"}}><p className="py-2 px-4 m-0 hover:bg-blue-50">Profile</p></Link>
                        <Link to={company  && company !="undefined"? '/compony/old':"/compony/new"} className=" no-underline " style={{"color":"black"}}><p className="py-2 px-4 m-0 hover:bg-blue-50">Compony</p></Link>
                        <p className="py-2 px-4 m-0 hover:bg-blue-50" onClick={()=>setOpenmadal(true)}>log out</p>
                        
                    </div>
                </div>
            </div >

            <Dialog
                visible={openmadal} 
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header="Confirm" 
                modal 
                footer={deleteProductDialogFooter}
                onHide={()=>setOpenmadal(false)}
              >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '1rem' }} />
                    {true && (
                        <span>
                            Are you sure  to logout 
                        </span>
                    )}
                </div>
            </Dialog>
        </div >
    )
}

