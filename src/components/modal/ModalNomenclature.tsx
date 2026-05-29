import { Button, Form, Input, Modal } from "antd"
import { useMemo, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Nomenclature, addItem, deleteItem, updateItem } from "../../redux/data-reducer/data-slice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import DropDown from "../select"
import './style.scss'
import { IPropsModalCatalog } from "./ModalNewCatalog"
const { TextArea } = Input

interface IPropsModal extends IPropsModalCatalog {
  nomenclature: Nomenclature
  setNomenclature: (arg: Nomenclature) => void
}

const rules = [
  {
    required: true,
    message: '',
  },
]

const isNotValidData = (values: Nomenclature) => {
  return !!Object.entries(values).find((el) => !el[1] && el[0] !== 'key')
}

export const ModalNomenclature = ({ isModalOpen, nomenclature, handleCancel, setNomenclature }: IPropsModal) => {
  const [form] = Form.useForm()
  const { data: { catalogs } } = useAppSelector((store) => store)
  const dispatch = useAppDispatch()
  const data = useMemo(() => catalogs.map((el) => {
    return {
      value: el.key,
      label: el.name
    }
  })
    , [catalogs])

  const onFinish = (values: Nomenclature) => {
    const notValid = isNotValidData(values)

    if (!notValid) {
      if (nomenclature.key) {
        dispatch(updateItem({ ...nomenclature, ...values}))
      } else {
        dispatch(addItem({ ...values, key: uuidv4().slice(0,8) }))
      }
      handleCancel()
    }
  }

  const deleteNomenclature = () => {
    dispatch(deleteItem(nomenclature))
    handleCancel()
  }

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen, form]);

  return (
    <Modal title={`${nomenclature.key ? `Редактирование ${nomenclature.name}` : 'Создание товара'}`} open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form
        className="form-upload-price"
        form={form}
        name="validateOnly"
        layout="vertical"
        onFinish={onFinish}
        initialValues={nomenclature}
      >
        <Form.Item required name="name" label="Название товара" rules={rules}>
          <Input placeholder="Введите название товара" />
        </Form.Item>
        <div className="actions">
          <Form.Item required name="brand" label="Бренд" rules={rules}>
            <Input placeholder="Введите бренд товара" />
          </Form.Item>
          <Form.Item required name="catalog" label="Каталог" rules={rules}>
          <DropDown value={nomenclature.catalog} options={data} onChange={(val) => setNomenclature({ ...nomenclature, catalog: val })} /></Form.Item>
        </div>
        <Form.Item required name="description" label="Описание товара" rules={rules}>
          <TextArea style={{ minHeight: '166px' }} />
        </Form.Item>
        <div className="actions">
          <Form.Item required name="price" label="Цена" rules={rules}>
            <Input placeholder="Введите цену" />
          </Form.Item>
          <Form.Item required name="quantity" label="Количество" rules={rules}>
            <Input placeholder="Введите количество" />
          </Form.Item>
        </div>
        <div className="actions buttons">
          <Button
            className="btn-submit"
            htmlType="submit"
          >
            Сохранить
          </Button>
          {!!nomenclature.key && <Button
            onClick={deleteNomenclature}
            className="btn-delete"
            htmlType="button"
          >
            Удалить
          </Button>}
        </div>
      </Form>
    </Modal>
  )
}