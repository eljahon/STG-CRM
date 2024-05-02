import { useEffect, useState } from 'react'
import GlobalFrom from '../../ui/form/global-from'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useQuery } from 'react-query';
import { AddData, GetAllData } from '../../service/global';
const cities: any = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
];
const typeArr: any = [
  {
    code: "drug",
    name: "drug"
  },
  {
    code: "fertilizer",
    name: "fertilizer",
  }
]
export default function ProductAction() {
  const {id} = useParams()
  const [diseases,setdiseases] = useState<any>([])
  const [index,setIndex] = useState<any>(1)
    const [indexArr, setIndexArr] = useState<any>([1])
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const  watchedFiles = watch()



  const { data:crops } = useQuery('blogs', () => GetAllData('crops'))
  const { data:units } = useQuery('units', () => GetAllData('units'))

  const getDiseesesByCrop = async (crop:string)=>{
      await  GetAllData(`diseases${crop &&`?filters[crop]=${crop}`}`,)
      .then((e)=>{
        setdiseases(e?.data)
      })
      .catch(errors=>console.log(errors))

  }
  
  useEffect(()=>{
    setValue("state.type", "drug")
    getDiseesesByCrop('')
  },[])

  const emptyTemplate = () => {
    return (
        <div className="flex align-items-center flex-column">
            <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                Drag and Drop Image Here
            </span>
        </div>
    );
};
  return (
    <div>
     <GlobalFrom 
        handleSubmit={handleSubmit}
        reset={reset} 
        // url={'products'}
        url={'test'}
        title={`Product ${id == "new" ? "Add":"Update"}`}
      >
      <div className='flex gap-4 '>
        <div className='w-8 flex gap-4 flex-wrap p-4 bg-white border-round-sm'>
          <div className='w-full flex gap-4 align-items-start'>
              <FloatLabel className='w-full' >
                <InputText 
                    className=" mr-2 w-full" 
                    id="title"
                    placeholder="title"
                    aria-label='title'
                      {...register(`title`, { required: true })}
                      value={watchedFiles?.title || ""}
                      />
                <label htmlFor="title">Title</label>
              </FloatLabel>
              <FloatLabel className='w-full' >
                <InputText 
                    className=" mr-2 w-full" 
                    id="price"
                    placeholder="price"
                      {...register(`price`, { required: true })}
                      value={watchedFiles?.price || ""}
                      />
                <label htmlFor="price">Price</label>
            </FloatLabel>
          </div>
          <div className='w-full flex gap-4  align-items-start'>
            <FloatLabel className='w-full' >
                <InputTextarea
                    className=" mr-2 w-full" 
                    id="description"
                    placeholder="description"
                      rows={7} cols={20} 
                      {...register(`description`, { required: true })}
                      value={watchedFiles?.description || ""}
                      />
                <label htmlFor="description">Description</label>
            </FloatLabel>
            <FloatLabel className='w-full' >
            <Dropdown 
              // value={watchedFiles.state?.type }
              className=" mr-2 w-full md:w-full" 
              onChange={(e) => setValue("state.type", e.target.value.name)}
              options={typeArr}
              optionLabel="name" 
              placeholder={watchedFiles.state?.type}
              // highlightOnSelect={true}
            />
            
              <label htmlFor="Type">{watchedFiles.state?.type ||  'Type'} </label>
            </FloatLabel>
          </div>
          <FileUpload
              className='mt-2 w-full'
              name="demo[]"
              url="/api/upload"
              multiple accept="image/*"
              emptyTemplate={emptyTemplate}

              maxFileSize={1000000}
              onUpload={()=>console.log("ok")} 
            />
        </div>
        <div className='w-4 p-4 bg-white border-round-md'>
         
           
          <div className="flex align-items-center flex-column">
            <i className="pi pi-image mt-2 p-5" style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1em', color: 'var(--text-color-secondary)' }} className="my-3">
                Drag and Drop Sertificate Here
            </span>
          </div>
          <FileUpload
              id='image'
              chooseLabel="uplaod"
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              className='w-full flex align-items-center justify-content-center'
              maxFileSize={1000000} 
              onUpload={()=>console.log("ok")} 
            />
           
          <div className="flex align-items-center flex-column mt-5">
              <i className="pi pi-image mt-2 p-5" style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
              <span style={{ fontSize: '1em', color: 'var(--text-color-secondary)' }} className="my-3">
                  Drag and Drop Sertificate Here
              </span>
           </div>
           <FileUpload
              id='image'
              chooseLabel="uplaod"
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              className='w-full flex align-items-center justify-content-center'
              maxFileSize={1000000} 
              onUpload={()=>console.log("ok")} 
            />
        </div>
      </div>
      
      <div className='p-4 bg-white border-round-sm mt-4'>
          {
            indexArr?.map((e,i)=>(
            <div key={i}  className='flex align-items-center gap-6 mb-4'>
              <div>
                <div className='flex mb-4'>
                  <FloatLabel className='w-full' >
                <Dropdown 
                     filter 
                       id='crop'
                      className=" mr-2 w-full md:w-full" 
                      onChange={(e) => {
                        setValue(`state.items[${i}].crop`, e.target.value.name)
                        getDiseesesByCrop(e.target.value.id)
                      }
                      }
                      placeholder={watchedFiles?.state?.items?.[i]?.crop}
                      options={crops?.data}
                      optionLabel="name" 
                      checkmark={true}
                      highlightOnSelect={false}
                    />  
                    <label htmlFor="crop">{watchedFiles?.state?.items?.[i]?.crop ||  'Crops'} </label>
                 </FloatLabel>
              { watchedFiles?.state?.type =="drug" &&
               <FloatLabel className='w-full' >
                <Dropdown 
                filter 
                id='disease'
                  className=" mr-2 w-full md:w-full" 
                  onChange={(e) => setValue(`state.items[${i}].disease`, e.target.value.name)}
                  placeholder={watchedFiles?.state?.items?.[i]?.disease}
                  options={diseases}
                  optionLabel="name" 
                
                  checkmark={true}
                  highlightOnSelect={false}
                />
                   <label htmlFor="disease">{watchedFiles?.state?.items?.[i]?.disease ||  'Diseases'} </label>
                 </FloatLabel>
                  }
                    <InputText 
                  className=" mr-2 w-full" 
                  id="dose_max"
                  placeholder="dose_max"
                  aria-label='dose_max'
                    {...register(`state.items[${i}].dose_max`, { required: true })}
                    value={watchedFiles?.state?.items?.[i]?.dose_max || ""}
                  />
                <InputText 
                  className=" mr-2 w-full" 
                  id="dose_min"
                  placeholder="dose_min"
                  aria-label='dose_min'
                  {...register(`state.items[${i}].dose_min`, { required: true })}
                  value={watchedFiles?.state?.items?.[i]?.dose_min || ""}
                  />
                <FloatLabel className='w-full' >
                  <Dropdown 
                  filter 
                  id='unit'
                      className=" mr-2 w-full md:w-full" 
                       onChange={(e) => setValue(`state.items[${i}].unit`, e.target.value.name)}
                      placeholder={watchedFiles?.state?.items?.[i]?.unit}
                      options={units?.data}
                      optionLabel="name" 
                      checkmark={true}
                      highlightOnSelect={false}
                    />  
                    <label htmlFor="unit">{watchedFiles?.state?.items?.[i]?.unit ||  'Units'} </label>
                 </FloatLabel>
                  {watchedFiles?.state?.type =="fertilizer"  &&     <InputText 
                  className="mr-2 w-full" 
                  id="use_count"
                  placeholder="use_count"
                  aria-label='use_count'
                  {...register(`state.items[${i}].use_count`, { required: true })}
                    value={watchedFiles?.state?.items?.[i]?.use_count || ""}
                    
                  />
                  }
                
                </div>
                <FloatLabel className='w-full' >
                    {watchedFiles?.state?.type == "drug" ?<>
                      <InputTextarea
                          className=" mr-2 w-full" 
                          id="description"
                          placeholder="description"
                            rows={4} cols={20} 
                            {...register(`state.items[${i}].description`)}
                            value={watchedFiles?.state?.items?.[i]?.description }
                            />
                      <label htmlFor="description">description</label>
                    </>:
                    <>
                    <InputTextarea
                          className=" mr-2 w-full" 
                          id="method"
                          placeholder="method"
                            rows={4} cols={20} 
                            {...register(`state.items[${i}].method`)}
                            value={watchedFiles?.state?.items?.[i]?.method || ""}
                            />
                      <label htmlFor="method">method</label>
                    </>}
                  </FloatLabel>
              </div>
              <Button 
              className='w-full max-w-10rem'
                  label="Delete"
                  type='button'  
                  severity="danger"
                  icon="pi pi-trash"
                  onClick={() => {
                    // setValue('price', watchedFiles.price?.filter((al,index) => index !== i))
                    setIndexArr((state:any) => state.length > 1? state?.slice(0, -1):state)
                  }}
                  />
            </div>
            ))
          }

        <Button 
        label="Add"
         type='button'  
         onClick={() => {
            setIndex(index + 1)
            setIndexArr(state=>[index + 1,...state])
        }}/>
      </div>
     </GlobalFrom>
    </div>
  )
}
