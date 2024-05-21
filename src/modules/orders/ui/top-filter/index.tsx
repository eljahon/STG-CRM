const TopFilter = ({ title }: any) => {
  return (
    <div className="flex   py-2 justify-content-between ">
      <h3 className="font-bold text-base  m-0">{title}</h3>
      <div className="flex  align-items-center gap-2">
        <div className="py-2 px-3     bg-white border-round-2xl cursor-pointer">
          <i
            className="pi pi-align-justify"
            style={{ fontSize: "1rem", color: "black" }}
          ></i>
        </div>
        <div className="py-2 px-3  bg-white border-round-2xl cursor-pointer">
          <i
            className="pi pi-objects-column"
            style={{ fontSize: "1rem", color: "black" }}
          ></i>
        </div>
      </div>
      <div className="py-2 px-3     bg-white border-round-2xl cursor-pointer">
        <i
          className="pi pi-filter"
          style={{ fontSize: "1rem", color: "black" }}
        ></i>
      </div>
    </div>
  );
};

export default TopFilter;
