const ORDER_STATUS: any = {
  pending: "#5AB2FF", //yellow
  accepted: "#FF9800",
  shipping: "#8576FF",
  completed: "#4CCD99",
  canceled: "#FF204E"
};

const hexToRgb = (hex: any) => {
  hex = hex?.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};
const StatusBtn = ({ label, status, className, onClick, loading }: any) => {
  return (
    <p
      onClick={onClick}
      className={` gap-2 px-4 py-1 border-round-2xl text-sm font-bold m-0 ${
        className && className
      } `}
      style={{
        backgroundColor: `rgba(${hexToRgb(
          ORDER_STATUS?.[`${status}`]
        )}, ${0.2})`,
        color: ORDER_STATUS?.[`${status}`]
      }}
    >
      <p
        className="flex align-items-center gap-2 m-0 text-nowrap"
        style={{ textWrap: "nowrap" }}
      >
        {loading ? (
          <i
            className="pi pi-spin pi-spinner-dotted"
            style={{ fontSize: "1rem" }}
          ></i>
        ) : (
          ""
        )}{" "}
        {label || status}
      </p>
    </p>
  );
};

export default StatusBtn;
