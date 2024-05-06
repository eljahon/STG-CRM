import { useEffect, useState } from "react";
import GlobalFrom from "../../ui/form/global-from";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
// import { FileUpload } from 'primereact/fileupload';
// import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { AddData, GetAllData, GetByIdData, UploadFile } from "../../service/global";
import { ImageUpload } from "../../utils/uplaoadFile";
const cities: any = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];
const typeArr: any = [
  {
    code: "drug",
    name: "drug",
  },
  {
    code: "fertilizer",
    name: "fertilizer",
  },
];
export default function ProductAction() {
  const { id } = useParams();
  const [diseases, setdiseases] = useState<any>([]);
  const [index, setIndex] = useState<any>(1);
  const [indexArr, setIndexArr] = useState<any>([1]);
  const [image, setImage] = useState<any>();
  const [imageMulti, setImageMulti] = useState<any>([]);
  const [imageSer, setImageSer] = useState<any>();
  const [loadingFile, setLoading] = useState<any>(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const watchedFiles = watch();
  const { data: crops } = useQuery("crops", () => GetAllData("crops"));
  const { data: units } = useQuery("units", () => GetAllData("units"));

  const getDiseesesByCrop = async (crop: string) => {
    await GetAllData(`diseases${crop && `?filters[crop]=${crop}`}`)
      .then((e) => {
        setdiseases(e?.data);
      })
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setValue("state.type", "drug");
    getDiseesesByCrop("");
  }, []);

  useEffect(() => {
      if(id != "new" && id){
        GetByIdData("products",id,{populate:"*"})
        .then((e) => {
          // console.log(e?.data?.state?.items)
            setValue('title',e?.data?.title)
            setValue('description',e?.data?.description)
            setValue('unit',e?.data?.unit?.id)
            setValue('price',e?.data?.price)
            setValue('state.type',e?.data?.state?.type)

            console.log(e?.data?.gallery)
            if(e?.data?.cer){
              setValue('cer',e?.data?.cer?.id)
              setImageSer(e?.data?.cer?.aws_path)
            }
            if(e?.data?.image){
              setValue('image',e?.data?.image?.id)
              setImage(e?.data?.image?.aws_path)
            }
            if(e?.data?.gallery?.length){
              setValue('gallery',e?.data?.gallery?.map((e:any)=>e?.id))
              setImageMulti(e?.data?.gallery?.map((e:any)=>e?.aws_path))
            }
            
            e?.data?.state?.items?.length && e?.data?.state?.items?.forEach((el, i) => {
              if(!indexArr.length) setIndexArr(state=>[i+1,...state])
              if(e?.data?.state?.items?.[i]?.crop) setValue(`state.items[${i}].crop`,e?.data?.state?.items?.[i]?.crop)
              if(e?.data?.state?.items?.[i]?.description) setValue(`state.items[${i}].description`, e?.data?.state?.items?.[i]?.description)
              if(e?.data?.state?.items?.[i]?.disease) setValue(`state.items[${i}].disease`, e?.data?.state?.items?.[i]?.disease?.id)
              if(e?.data?.state?.items?.[i]?.dose_max)  setValue(`state.items[${i}].dose_max`, e?.data?.state?.items?.[i]?.dose_max)
              if(e?.data?.state?.items?.[i]?.dose_min) setValue(`state.items[${i}].dose_min`, e?.data?.state?.items?.[i]?.dose_min)
              if(e?.data?.state?.items?.[i]?.unit)setValue(`state.items[${i}].unit`, e?.data?.state?.items?.[i]?.unit?.id)
              if(e?.data?.state?.items?.[i]?.use_count)setValue(`state.items[${i}].use_count`, e?.data?.state?.items?.[i]?.use_count)
              if(e?.data?.state?.items?.[i]?.method)setValue(`state.items[${i}].method`, e?.data?.state?.items?.[i]?.method)
              
         })

        })
        .catch((errors) => console.log(errors));
  
      }
  }, [id]);

  // console.log(watchedFiles,indexArr)
 
  const hendleimg = async (e: any, type: string) => {
    setLoading(type)
    if (e.target.files[0]) {
      const res = await ImageUpload(e.target.files[0], {type:"image",folder:"other"}).finally(()=>setLoading(false))
      if(type == "image"){
        setValue('image',res?.data?.media?.id)
        setImage(res?.data?.media?.aws_path)
      }
      if(type == "sertificate"){
        setValue('cer',res?.data?.media?.id)
        setImageSer(res?.data?.media?.aws_path)
      }
      if(type == "imageMilti"){
        if(watchedFiles?.gallery?.length){
          setValue('gallery',[res?.data?.media?.id,...watchedFiles?.gallery])
          setImageMulti((state:any)=> [res?.data?.media?.aws_path, ...state])
        } else{
          setValue('gallery',[res?.data?.media?.id])
          setImageMulti( [res?.data?.media?.aws_path]) 
        }
      }
    }
  
  };
  const hendleRemoveimg = async (e: any, type: string) => {
      if(type == "image"){
        setValue('image',null)
        setImage(null)
      }

      if(type == "sertificate"){
        setValue('cer',null)
        setImageSer(null)
      }

      if(type == "imageMilti"){
        setImageMulti((state:any)=>state.filter((aE:any)=>aE != e))
        setValue('gallery',watchedFiles?.gallery?.filter((aE:any)=>aE != e))
      }
  };



  return (
    <div>
      <GlobalFrom
        handleSubmit={handleSubmit}
        reset={reset}
        url={"products"}
        navUrl={'/product'}
        title={`Product ${id == "new" ? "Add" : "Update"}`}
      >
        <div className="flex gap-4 ">
          <div className="w-8 bg-white border-round-sm">
            <div className="w-full flex gap-4 flex-wrap p-4  align-items-start ">
              <div className="w-full flex gap-4 align-items-start">
                <FloatLabel className="w-full">
                  <InputText
                    className=" mr-2 w-full"
                    id="title"
                    placeholder="title"
                    aria-label="title"
                    {...register(`title`, { required: true })}
                    value={watchedFiles?.title || ""}
                  />
                  <label htmlFor="title">Title</label>
                </FloatLabel>
                <FloatLabel className="w-full">
                  <InputText
                    type="number"
                    className="mr-2 w-full"
                    id="price"
                    placeholder="price"
                    // {...register(`price`, {required: true })}
                    value={watchedFiles?.price || ""}
                    onChange={(e)=> setValue('price', +e.target.value)}
                  />
                  <label htmlFor="price">Price</label>
                </FloatLabel>
              </div>
              <div className="w-full flex gap-4  align-items-start">
                <FloatLabel className="w-full">
                  <Dropdown
                    className=" mr-2 w-full md:w-full"
                    onChange={(e) => setValue("state.type", e.value)}
                    options={typeArr}
                    optionLabel="name"
                    disabled={id != "new"}
                    optionValue="name"
                    value={watchedFiles?.state?.type}
                    placeholder={"Select Type"}
                  />
                  <label htmlFor="Type"> Type </label>
                </FloatLabel>
                <FloatLabel className="w-full">
                  <Dropdown
                    filter
                    id="unit"
                    className=" mr-2 w-full md:w-full"
                    onChange={(e) => setValue(`unit`, e.value)}
                    placeholder={"Select Units"}
                    value={watchedFiles?.unit}
                    options={units?.data}
                    optionValue="id"
                    optionLabel="name"
                    // checkmark={true}
                    highlightOnSelect={false}
                  />
                  <label htmlFor="unit">Units </label>
                </FloatLabel>
              </div>
              <FloatLabel className="w-full">
                <InputTextarea
                  className=" mr-2 w-full"
                  id="description"
                  placeholder="description"
                  rows={7}
                  cols={20}
                  {...register(`description`, { required: true })}
                  value={watchedFiles?.description || ""}
                />
                <label htmlFor="description">Description</label>
              </FloatLabel>
            <div className="w-full">
              <label className="w-6 ">
                <div className="w-6 p-3 bg-primary border-round-md cursor-pointer flex align-items-center justify-content-center gap-2">
                  <i className="pi pi-upload" style={{ fontSize: "1rem" }} />
                  upload
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => hendleimg(e, "imageMilti")}
                />
              </label>
              {
                imageMulti.length ? 
                <div className="flex  flex=wrap gap-2 mt-3">
                    {
                      loadingFile== 'imageMilti' && <div>loading</div>
                    }
                    {
                      imageMulti && imageMulti?.map((e,i)=>(
                     <div key={i} className="w-full relative imageFlex" style={{"maxWidth":"200px"}}>
                         <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center gap-4"> 
                          <span className="cursor-pointer">
                          <i className="pi pi-eye"  style={{ fontSize: "1.4rem" ,color:"white"}} />
                          </span>
                          <span className="cursor-pointer" 
                            onClick={()=>hendleRemoveimg(e,"imageMilti")}
                          >
                          <i className="pi pi-trash" style={{ fontSize: "1.4rem",color:"white" }} />
                          </span>
                         </div>
                         <img  className="w-full" style={{"maxWidth":"200px"}} src={import.meta.env.VITE_APP_AWS_PATH + e} width={200} height={120} />
                     </div>
                      ))
                    }
                </div>: 
                loadingFile== 'imageMilti' 
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
            </div>
          </div>
            <div className="w-4 p-4 bg-white border-round-md">
            {loadingFile == "image" ? (
              <div>loading</div>
            ) : image ? (
              <div className="w-full flex align-items-center justify-content-center   flex-column">
                <div  className="w-full relative imageFlex" style={{"maxWidth":"200px"}}>
                      <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center gap-4"> 
                      <span className="cursor-pointer">
                      <i className="pi pi-eye"  style={{ fontSize: "1.4rem" ,color:"white"}} />
                      </span>
                      <span className="cursor-pointer" 
                        onClick={()=>hendleRemoveimg(image,"imageMilti")}
                      >
                      <i className="pi pi-trash" style={{ fontSize: "1.4rem",color:"white" }} />
                      </span>
                      </div>
                      <img  className="w-full" style={{"maxWidth":"200px"}} src={import.meta.env.VITE_APP_AWS_PATH + image} width={200} height={120} />
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
                <div className="w-full p-3 bg-primary border-round-md cursor-pointer flex align-items-center justify-content-center gap-2">
                  <i className="pi pi-upload" style={{ fontSize: "1rem" }} />
                  upload
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => hendleimg(e, "image")}
                />
              </label>
              {image && (
                <Button
                  className="w-full "
                  label="Delete"
                  type="button"
                  severity="danger"
                  icon="pi pi-trash"
                />
              )}
            </div>

            {loadingFile == "sertificate" ? (
              <div className="mt-4">loading</div>
            ) : imageSer ? (
              <div className="w-full flex align-items-center justify-content-center  mt-4 flex-column">
                <div  className="w-full relative imageFlex" style={{"maxWidth":"200px"}}>
                      <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center gap-4"> 
                      <span className="cursor-pointer">
                      <i className="pi pi-eye"  style={{ fontSize: "1.4rem" ,color:"white"}} />
                      </span>
                      <span className="cursor-pointer" 
                        onClick={()=>hendleRemoveimg(imageSer,"imageMilti")}
                      >
                      <i className="pi pi-trash" style={{ fontSize: "1.4rem",color:"white" }} />
                      </span>
                      </div>
                      <img  className="w-full" style={{"maxWidth":"200px"}} src={import.meta.env.VITE_APP_AWS_PATH + imageSer} width={200} height={120} />
                  </div>
                <span
                  style={{
                    fontSize: "1em",
                    color: "var(--text-color-secondary)",
                  }}
                  className="my-3"
                >
                  Drag and Drop Sertificate Here
                </span>
              </div>
            ) : (
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
                  Drag and Drop Sertificate Here
                </span>
              </div>
            )}
            <div className="flex gap-2">
              <label className="w-full ">
                <div className="w-full p-3 bg-primary border-round-md cursor-pointer flex align-items-center justify-content-center gap-2">
                  <i className="pi pi-upload" style={{ fontSize: "1rem" }} />
                  upload
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => hendleimg(e, "sertificate")}
                />
              </label>
              {imageSer && (
                <Button
                  className="w-full "
                  label="Delete"
                  type="button"
                  severity="danger"
                  icon="pi pi-trash"
                />
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-round-sm mt-4">
          {indexArr?.map((e, i) => (
            <div key={i} className="flex align-items-center gap-6 mb-4">
              <div className="w-10">
                <div className="flex mb-4 gap-2">
                  <FloatLabel className="w-full">
                    <Dropdown
                      filter
                      id="crop"
                      className=" mr-2 w-full md:w-full"
                      onChange={(e) => {
                        setValue(`state.items[${i}].crop`, e.value);
                        getDiseesesByCrop(e.value);
                      }}
                      value={watchedFiles?.state?.items?.[i]?.crop}
                      placeholder={"Select Crops"}
                      optionValue="id"
                      options={crops?.data}
                      optionLabel="name"
                      checkmark={true}
                      highlightOnSelect={false}
                    />
                    <label htmlFor="crop"> Crops</label>
                  </FloatLabel>
                  {watchedFiles?.state?.type == "drug" && (
                    <FloatLabel className="w-full">
                      <Dropdown
                        filter
                        id="disease"
                        className=" mr-2 w-full md:w-full"
                        onChange={(e) =>
                          setValue(`state.items[${i}].disease`, e.value)
                        }
                        placeholder={"Select Diseases"}
                        value={watchedFiles?.state?.items?.[i]?.disease}
                        optionValue="id"
                        optionLabel="name"
                        options={diseases}
                        checkmark={true}
                        highlightOnSelect={false}
                      />
                      <label htmlFor="disease">Diseases </label>
                    </FloatLabel>
                  )}
                  <InputText
                    className=" mr-2 w-full"
                    id="dose_max"
                    type="number"
                    placeholder="dose_max"
                    aria-label="dose_max"
                    // {...register(`state.items[${i}].dose_max`, {
                    //   required: true,
                    // })}
                    onChange={(e)=>  setValue(`state.items[${i}].dose_max`, +e.target.value)}
                    value={watchedFiles?.state?.items?.[i]?.dose_max || ""}
                  />
                  <InputText
                    className="mr-2 w-full"
                    id="dose_min"
                    type="number"
                    placeholder="dose_min"
                    aria-label="dose_min"
                    // {...register(`state.items[${i}].dose_min`, {
                    //   required: true
                    // })}
                    onChange={(e)=> setValue(`state.items[${i}].dose_min`, +e.target.value)}
                    value={watchedFiles?.state?.items?.[i]?.dose_min || ""}
                  />
                  <FloatLabel className="w-full">
                    <Dropdown
                      filter
                      id="unit"
                      className=" mr-2 w-full md:w-full"
                      onChange={(e) =>
                        setValue(`state.items[${i}].unit`, e.value)
                      }
                      placeholder={"Select Units"}
                      value={watchedFiles?.state?.items?.[i]?.unit}
                      options={units?.data}
                      optionValue="id"
                      optionLabel="name"
                      // checkmark={true}
                      highlightOnSelect={false}
                    />
                    <label htmlFor="unit">Units </label>
                  </FloatLabel>
                  {watchedFiles?.state?.type == "fertilizer" && (
                    <InputText
                      type="number"
                      className="mr-2 w-full"
                      id="use_count"
                      placeholder="use_count"
                      aria-label="use_count"
                      {...register(`state.items[${i}].use_count`, {
                        required: true,
                      })}
                      value={watchedFiles?.state?.items?.[i]?.use_count || ""}
                    />
                  )}
                </div>
                <FloatLabel className="w-full">
                  {watchedFiles?.state?.type == "drug" ? (
                    <>
                      <InputTextarea
                        className=" mr-2 w-full"
                        id="description"
                        placeholder="description"
                        rows={4}
                        cols={20}
                        {...register(`state.items[${i}].description`)}
                        value={watchedFiles?.state?.items?.[i]?.description}
                      />
                      <label htmlFor="description">description</label>
                    </>
                  ) : watchedFiles?.state?.type == "fertilizer"?  (
                    <>
                      <InputTextarea
                        className=" mr-2 w-full"
                        id="method"
                        placeholder="method"
                        rows={4}
                        cols={20}
                        {...register(`state.items[${i}].method`)}
                        value={watchedFiles?.state?.items?.[i]?.method || ""}
                      />
                      <label htmlFor="method">method</label>
                    </>
                  ):''}
                </FloatLabel>
              </div>
              <Button
                className="w-2 max-w-10rem"
                label="Delete"
                type="button"
                severity="danger"
                icon="pi pi-trash"
                onClick={() => {
                  // setValue('price', watchedFiles.price?.filter((al,index) => index !== i))
                  setIndexArr((state: any) =>
                    state.length > 1 ? state?.slice(0, -1) : state
                  );
                }}
              />
            </div>
          ))}

          <Button
            label="Add"
            type="button"
            onClick={() => {
              setIndex(index + 1);
              setIndexArr((state) => [index + 1, ...state]);
            }}
          />
        </div>
      </GlobalFrom>
    </div>
  );
}