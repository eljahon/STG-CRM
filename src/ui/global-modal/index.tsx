
const GlobalMadal = ({ className, close, title, children }: any) => {
  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0  p-4 ${
        className && className
      }`}
      style={{ background: "#2155A329", zIndex: "100000000000023" }}
      onClick={close}
    >
      <div
        className="m-auto bg-white w-full p-4 border-round-2xl relative"
        style={{ maxWidth: "1000px", minHeight: "50vh" }}
        onClick={(e: any) => e.stopPropagation()}
      >
        <h3 className="m-0 mb-5 ">{title}</h3>
        <div
          className="p-2 pb-1 border-round-2xl absolute   cursor-pointer"
          style={{ background: "#F4F9FD", top: "20px", right: "20px" }}
          onClick={close}
        >
          <i
            className="pi pi-times cursor-pointer "
            onClick={close}
            style={{ fontSize: "1.4em" }}
          ></i>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GlobalMadal;
