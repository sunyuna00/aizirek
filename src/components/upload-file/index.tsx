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

            messageApi.success({
              content: 'Файл успешно загружен 💗',
            });

          } else {
            messageApi.error({
              content: 'Некорректный JSON файл 💔',
            });
          }

        } catch (error) {
          console.error('Error parsing JSON:', error);

          messageApi.error({
            content: 'Ошибка чтения файла 💔',
          });
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <>
      <label className="upload-wrapper" htmlFor='file'>
        <input
          type='file'
          name='file'
          accept='.json'
          id='file'
          onChange={handleFileChange}
          multiple={false}
        />

        <div className="upload-content">

          <img
            src='assets/json.webp'
            alt='json'
            className='icon'
          />

          <div className="description">

            <div className="title">
              Загрузите JSON файл
            </div>

            <div className="subtitle">
              Нажмите или перетащите файл сюда ✨
            </div>

          </div>
        </div>
      </label>

      {contextHolder}
    </>
  )
}