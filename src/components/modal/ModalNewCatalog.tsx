import { Button, Form, Input, Modal } from "antd"
import { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Catalog, addCatalog } from "../../redux/data-reducer/data-slice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import DropDown from "../select"
import './style.scss'

export interface IPropsModalCatalog {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
}

const rules = [
  {
    required: true,
    message: '',
  },
]

const InitialValue = {
  name: '',
  root: '',
  key: ''
}

export const ModalNewCatalog = ({ isModalOpen, handleCancel }: IPropsModalCatalog) => {
  const [state, setState] = useState<Catalog>(InitialValue)
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

  const onFinish = (values: Catalog) => {

    if (values.name) {
      dispatch(addCatalog({ ...values, key: uuidv4().slice(0, 8) }))
      handleCancel()
      setState(InitialValue)
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      setState(InitialValue)
    }
  }, [isModalOpen, form]);

  return (
    <Modal title="Создание каталога" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form
        className="form-upload-price"
        form={form}
        name="validateOnly"
        layout="vertical"
        onFinish={onFinish}
        initialValues={state}
      >
        <Form.Item required name="name" label="Название каталога" rules={rules}>
          <Input placeholder="Введите название каталога" />
        </Form.Item>
        <Form.Item name="root" label="Родительский каталог" className="wrapper-form-select">
          <DropDown value={state.root} options={data} onChange={(val) => setState((prev) => ({ ...prev, root: val }))} placeholder="Выберите каталог" listHeight={102} /></Form.Item>
        <div className="actions buttons">
          <Button
            className="btn-submit"
            htmlType="submit"
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  )
}