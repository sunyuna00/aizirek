import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Nomenclature, resetData } from "../../redux/data-reducer/data-slice";
import { SortByPrice } from "../../redux/filter-reducer/filter-slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ModalNomenclature } from "../modal/ModalNomenclature";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.scss";

const columns = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Код",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Каталог",
    dataIndex: "catalog",
    key: "catalog",
  },
  {
    title: "Описание",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Бренд",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Количество",
    dataIndex: "quantity",
    key: "quantity",
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const InitNomenclature = {
  key: "",
  catalog: "",
  name: "",
  description: "",
  price: 1,
  quantity: 1,
  brand: "",
};

export const ListProducts = () => {
  const {
    data: { nomenclatures, catalogs },
    filter: { activeCatalog, byPrice, searchCount, searchName },
  } = useAppSelector((store) => store);
  const [dataForRender, setDataForRender] = useState(nomenclatures);
  const [nomenclature, setNomenclature] =
    useState<Nomenclature>(InitNomenclature);
  const [show, setIsShow] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let filteredData = nomenclatures;

    if (activeCatalog) {
      const allCatalogskeys = catalogs
        .filter((el) => el.key === activeCatalog || el.root === activeCatalog)
        .map((el) => el.key);
      filteredData = filteredData.filter((el) =>
        allCatalogskeys.includes(el.catalog),
      );
    }

    if (byPrice) {
      filteredData = [...filteredData].sort((a, b) => {
        if (byPrice === SortByPrice.expansive) {
          return b.price - a.price;
        } else {
          return a.price - b.price;
        }
      });
    }

    if (searchName) {
      filteredData = filteredData.filter(
        (el) => el.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1,
      );
    }

    if (searchCount) {
      filteredData = filteredData.filter(
        (el) => el.quantity < Number(searchCount),
      );
    }
    setDataForRender(filteredData);
  }, [
    nomenclatures,
    catalogs,
    activeCatalog,
    byPrice,
    searchCount,
    searchName,
  ]);

  const closeModal = () => {
    setIsShow(false);
    setNomenclature(InitNomenclature);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify({ nomenclatures, catalogs }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="wrapper-table">
      <div className="action">
        <Button
          className="download-btn"
          type="primary"
          onClick={handleDownload}
          icon={<DownloadOutlined />}
        >
          Скачать данные
        </Button>

        <Button
          className="delete-btn"
          type="default"
          onClick={() => dispatch(resetData())}
          icon={<DeleteOutlined />}
        >
          Удалить данные
        </Button>
      </div>
      <Table
        dataSource={dataForRender}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              setNomenclature(record);
              setIsShow(true);
            },
          };
        }}
      />
      <ModalNomenclature
        isModalOpen={show}
        nomenclature={nomenclature}
        handleCancel={closeModal}
        handleOk={closeModal}
        setNomenclature={setNomenclature}
      />
    </div>
  );
};
