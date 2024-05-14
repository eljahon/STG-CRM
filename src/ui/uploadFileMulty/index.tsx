import  { useEffect, useState } from 'react'
import { ImageUpload } from '../../utils/uplaoadFile';

export default function UploadFileMulty({setValue,fieldName,value=[],valueId=[],className}:any) {
  const [image, setImage] = useState<any>(value);
  const [loadingFile, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    setImage(value)
  },[value])

  const hendleimg = async (e: any) => {
    setLoading(true)
    if (e.target.files[0]) {
      const res = await ImageUpload(e.target.files[0], {type:"image",folder:"other"}).finally(()=>setLoading(false))
   
        if(value?.length){
          setValue(fieldName,[res?.data?.media?.id,...valueId])
          setImage((state:any)=> [res?.data?.media, ...state])
        } else{
          setValue(fieldName,[res?.data?.media?.id])
          setImage( [res?.data?.media]) 
        }
    }
  };

  const hendleRemoveimg = async (e: any) => {
    setImage((state:any)=>state.filter((aE:any)=>aE?.id != e))
    setValue(fieldName,valueId?.filter((aE:any)=>aE != e))
    
  };
  return (
    <div className={`w-full ${className && className}`}>
      <label className="w-6 ">
        <div className="w-6 p-3 bg-green-500 text-white border-round-3xl cursor-pointer flex align-items-center justify-content-center gap-2">
          <i className="pi pi-upload " style={{ fontSize: "1rem" }} />
          upload
        </div>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          className="hidden"
          onChange={(e) => hendleimg(e)}
        />
      </label>
    {
      image.length ? 
      <div className="flex  flex=wrap gap-2 mt-3">
          {
            loadingFile && <div>loading</div>
          }
          {
            image && image?.map((e:any,i:any)=>(
           <div key={i} className="w-full relative imageFlex" style={{"maxWidth":"200px"}}>
               <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center gap-4"> 
                <span className="cursor-pointer">
                <i className="pi pi-eye"  style={{ fontSize: "1.4rem" ,color:"white"}} />
                </span>
                <span className="cursor-pointer" 
                  onClick={()=>hendleRemoveimg(e?.id)}
                >
                <i className="pi pi-trash" style={{ fontSize: "1.4rem",color:"white" }} />
                </span>
               </div>
               <img  className="w-full" style={{"maxWidth":"200px"}} src={import.meta.env.VITE_APP_AWS_PATH + e?.aws_path} width={200} height={120} />
           </div>
            ))
          }
      </div>: 
      loadingFile
      ? <div>loading</div>:
      <div className="flex align-items-center flex-column mt-4">
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
    }
  </div>
  )
}
