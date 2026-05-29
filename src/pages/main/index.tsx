import { Actions } from "../../components/actions"
import { ListProducts } from "../../components/list-products"
import { UploadFile } from "../../components/upload-file"
import { useAppSelector } from "../../redux/store"
import './style.scss'

const Main = () => {
  const { catalogs } = useAppSelector((store) => store.data)

  return (
    <>{
      catalogs.length ? <div className="wrapper-main"><Actions /><ListProducts /></div> : <UploadFile />
    }
    </>
  )
}

export default Main