import GolabTable from "../../../../ui/tabel";

interface IProductItems {
  fertilizerItems?: any;
  drugItems?: any;
  type: any;
  totalProduct?: any;
  pageSize?: any;
  currentPage?: any;
  page?: any;
  setPage?: any;
}

const columnsdrug = [
  {
    header: "disease name",
    field: "disease.name",
    id: 1,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "dose_max",
    field: "dose_max",
    id: 2,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "dose_min",
    field: "dose_min",
    id: 3,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "unit name",
    field: "unit.name",
    id: 4,
    exportable: false,
    style: { minWidth: "12rem" }
  }
];
const columnsfert = [
  {
    header: "crop name",
    field: "crop.name",
    id: 1,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "dose_max",
    field: "dose_max",
    id: 2,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "dose_min",
    field: "dose_min",
    id: 3,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "use_count",
    field: "use_count",
    id: 4,
    exportable: false,
    style: { minWidth: "12rem" }
  },
  {
    header: "unit name",
    field: "unit.name",
    id: 4,
    exportable: false,
    style: { minWidth: "12rem" }
  }
];
const ProductItems = ({
  fertilizerItems,
  totalProduct,
  pageSize,
  page,
  setPage,
  drugItems,
  type
}: IProductItems) => {
  return (
    <>
      {type == "drug" ? (
        <GolabTable
          tableTile="Product list"
          isLoading={false}
          data={drugItems}
          columns={columnsdrug}
          totalProduct={totalProduct}
          pageSize={pageSize}
          currentPage={page}
          pageChange={(event: any) => {
            setPage(event.first);
          }}
        />
      ) : (
        <GolabTable
          tableTile="Product list"
          isLoading={false}
          data={fertilizerItems}
          columns={columnsfert}
          totalProduct={totalProduct}
          pageSize={pageSize}
          currentPage={page}
          pageChange={(event: any) => {
            setPage(event.first);
          }}
        />
      )}
    </>
  );
};

export default ProductItems;
