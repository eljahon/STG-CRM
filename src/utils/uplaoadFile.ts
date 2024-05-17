import { UploadFile } from "../service/upload"

export async function ImageUpload(file:any, query:any,setProgress:any) {
    const formData = new FormData()
    formData.append("file", file)
    return await UploadFile(formData,query,setProgress)
        .then((data) => {
            return data
        })
        .catch((errr) => console.log(errr))
    

  }

