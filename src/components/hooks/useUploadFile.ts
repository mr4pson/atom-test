import { FormInstance } from "antd";
import axios from "axios";

export function useUploadFile(
  formRef: React.RefObject<FormInstance<any>>,
  setIsChoosenFileChecked?: (value: boolean) => void,
  fieldName: string = 'uploadFile',
): any {
  const path = '/api/attachments/addAttachments';

  async function uploadFiles(files: FileList) {
    const formData = new FormData();
    formData.append("files", files[0]);
    return await axios.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async function uploadMediaFile(event): Promise<string> {
    const uploadFileResponse = await uploadFiles(event.currentTarget.files as FileList);

    formRef.current?.setFieldsValue({
      [fieldName]: uploadFileResponse.data[0].fileName,
    });
    if (setIsChoosenFileChecked) {
      setIsChoosenFileChecked(false);
    }
    
    return uploadFileResponse.data[0].fileName
  }

  return {
    uploadMediaFile,
  }
}
