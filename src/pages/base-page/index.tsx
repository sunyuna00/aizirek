import { Outlet } from "react-router-dom"
import './style.scss'

const BasePage = () => {
  return (
    <div className="wrapper-page">
      <header>
        <h1>Приложение для складского учета</h1>
      </header>
      <Outlet />
    </div>
  )
}

export default BasePage