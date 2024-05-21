const TabBar = ({ className, title, Items = [] }: any) => {
  return (
    <div
      className={`w-full bg-white border-round-2xl  ${className && className}`}
      style={{ maxWidth: "265px", minHeight: `80vh` }}
    >
      <div className="p-4 pb-3  border-bottom-1 border-200 flex  align-items-center gap-2">
        <h3
          className="font-bold text-base  m-0
        "
        >
          {title}
        </h3>
        <i className="pi pi-chevron-down" />
      </div>

      <div className="m-2">
        {Items?.map((e: any, i: any) => (
          <p
            key={i}
            className="text-base font-normal px-4 py-2 m-0 mb-2 hover:bg-green-400 hover:text-white border-round-2xl"
          >
            {e}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
