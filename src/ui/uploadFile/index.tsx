import React, { useEffect, useState } from 'react'
import { ImageUpload } from '../../utils/uplaoadFile';

export default function UploadFile({setValue,fieldName,value,className}:any) {

  const [image, setImage] = useState<any>(value);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  useEffect(()=>{
    setImage(value)
  },[value])

  const hendleimg = async (e: any) => {
    setLoadingFile(true)
    if (e.target.files[0]) {
      const res = await ImageUpload(e.target.files[0], {type:"image",folder:"other"}).finally(()=>setLoadingFile(false))
        setValue(fieldName,res?.data?.media?.id)
        setImage(res?.data?.media?.aws_path)
      }
  };

  const hendleRemoveimg = async (e: any) => {
      setValue(fieldName,null)
      setImage(null)
  };
  
  return (
    <div className={`w-full ${className && className}`}>
      {loadingFile  ? (
              <div>loading</div>
            ) : image ? (
              <div className="w-full flex align-items-center justify-content-center   flex-column">
                <div  className="w-full relative imageFlex" style={{"maxWidth":"200px"}}>
                      <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center gap-4"> 
                      <span className="cursor-pointer">
                      <i className="pi pi-eye"  style={{ fontSize: "1.4rem" ,color:"white"}} />
                      </span>
                      <span className="cursor-pointer" 
                        onClick={()=>hendleRemoveimg(image)}
                      >
                      <i className="pi pi-trash" style={{ fontSize: "1.4rem",color:"white" }} />
                      </span>
                      </div>
                      <img  className="w-full" style={{"maxWidth":"200px","objectFit":"contain"}} src={import.meta.env.VITE_APP_AWS_PATH + image} width={200} height={120} />
                  </div>
                <span
                  style={{
                    fontSize: "1em",
                    color: "var(--text-color-secondary)",
                  }}
                  className="my-3"
                >
                  Drag and Drop Image Here
                </span>
              </div>
            ) : (
              <div className="flex align-items-center flex-column">
                <i
                  className="pi pi-image mt-2 p-5"
                  style={{
                    fontSize: "3em",
                    borderRadius: "50%",
                    backgroundColor: "var(--surface-b)",
                    color: "var(--surface-d)",
                  }}
                ></i>
                <span
                  style={{
                    fontSize: "1em",
                    color: "var(--text-color-secondary)",
                  }}
                  className="my-3"
                >
                  Drag and Drop Image Here
                </span>
              </div>
            )}
            <div className="flex gap-2">
              <label className="w-full ">
                <div className="w-full p-3 bg-green-500 text-white  border-round-3xl cursor-pointer flex align-items-center justify-content-center gap-2">
                  <i className="pi pi-upload" style={{ fontSize: "1rem" }} />
                  upload
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => hendleimg(e)}
                />
              </label>
         
            </div>
    </div>
  )
}
