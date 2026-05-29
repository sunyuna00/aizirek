import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { useMemo, useState } from "react";
import {
  SortByPrice,
  changeByPrice,
  changeSearchCount,
  changeSearchName,
  reset,
  selectCatalog,
} from "../../redux/filter-reducer/filter-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import RadioGroup from "../radio";
import DropDown from "../select";
import "./style.scss";
import { Nomenclature } from "../../redux/data-reducer/data-slice";
import { InitNomenclature } from "../list-products";
import { ModalNomenclature } from "../modal/ModalNomenclature";
import { ModalNewCatalog } from "../modal/ModalNewCatalog";
const dataForRadioGroup = [
  {
    value: SortByPrice.cheap,
    label: "Дешевые",
  },
  {
    value: SortByPrice.expansive,
    label: "Дорогие",
  },
];

export const Actions = () => {
  const {
    data: { catalogs },
    filter: { activeCatalog, byPrice, searchCount, searchName },
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const data = useMemo(
    () =>
      catalogs.map((el) => {
        return {
          value: el.key,
          label: el.name,
        };
      }),
    [catalogs],
  );

  const [nomenclature, setNomenclature] =
    useState<Nomenclature>(InitNomenclature);
  const [show, setIsShow] = useState(false);
  const [showCatalog, setIsShowCatalog] = useState(false);

  const [state, setState] = useState({ count: searchCount, name: searchName });

  const isDisabled = useMemo(
    () => !(activeCatalog || byPrice || searchCount || searchName),
    [activeCatalog, byPrice, searchCount, searchName],
  );

  const resetFilters = () => {
    setState({ count: "", name: "" });
    dispatch(reset());
  };

  const closeModal = () => {
    setNomenclature(InitNomenclature);
    setIsShow(false);
  };

  return (
    <div className="wrapper-actions">
      <DropDown
        value={activeCatalog}
        options={[...data, { value: "", label: "Все каталоги" }]}
        onChange={(val) => dispatch(selectCatalog(val))}
      />
      <Search
        placeholder="Название"
        value={state.name}
        onChange={(e) =>
          setState((prev) => ({ ...prev, name: e.target.value }))
        }
        onSearch={() => dispatch(changeSearchName(state.name))}
        enterButton
      />
      <Search
        className="count"
        placeholder="Количество"
        type="number"
        value={state.count}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            count: e.target.value.replace(/[^0-9]/g, ""),
          }))
        }
        onSearch={() => dispatch(changeSearchCount(state.count))}
        enterButton
      />
      <RadioGroup
        options={dataForRadioGroup}
        value={byPrice}
        onChange={(val) => dispatch(changeByPrice(val.target.value))}
      />
      <Button
        className="reset-btn"
        type="primary"
        disabled={isDisabled}
        onClick={resetFilters}
      >
        Сброс
      </Button>

      <Button
        className="add-btn"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsShow(true)}
      >
        Товар
      </Button>

      <Button
        className="add-btn catalog-btn"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsShowCatalog(true)}
      >
        Каталог
      </Button>
      <ModalNomenclature
        isModalOpen={show}
        nomenclature={nomenclature}
        handleCancel={closeModal}
        handleOk={closeModal}
        setNomenclature={setNomenclature}
      />
      <ModalNewCatalog
        isModalOpen={showCatalog}
        handleCancel={() => setIsShowCatalog(false)}
        handleOk={() => setIsShowCatalog(false)}
      />
    </div>
  );
};
