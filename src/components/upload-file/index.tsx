import { ChangeEvent } from 'react'
import './style.scss'
import { DataJson, uploadData } from '../../redux/data-reducer/data-slice';
import { useAppDispatch } from '../../redux/store';
import { message } from 'antd';


export const UploadFile = () => {
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result as string;
        try {
          const json = JSON.parse(text) as DataJson;
          if (json['catalogs'] && json['nomenclatures']) {
            dispatch(uploadData(json))
          } else {
            return messageApi.open({
              type: 'error',
              content: 'Вы загружаете некорректные данные!',
            });
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <label className="upload-wrapper" htmlFor='file'>
      <input
        type='file'
        name='file'
        accept='.json'
        id='file'
        onChange={handleFileChange}
        multiple={false}

      />
      <img src='assets/json.webp' alt=''
        className='icon'
      />
      <div className="description">
        <div className="title">
          Кликните или перетащите файл в эту область для загрузки
        </div>
        <div className="subtitle">
          Можно загрузить лишь один файл с расширением .json
        </div>
      </div>
      {contextHolder}
    </label>
  )
}