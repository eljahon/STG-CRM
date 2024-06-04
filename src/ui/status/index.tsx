const ORDER_STATUS: any = {
  pending: "#5AB2FF", //yellow
  accepted: "#FF9800",
  shipping: "#8576FF",
  completed: "#4CCD99",
  cancelled: "#FF204E"
};

const hexToRgb = (hex: any) => {
  hex = hex?.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};
const StatusBtn = ({ label, status, className }: any) => {
  return (
    <p
      className={`px-4 py-1 border-round-2xl text-sm font-bold m-0 ${
        className && className
      } `}
      style={{
        backgroundColor: `rgba(${hexToRgb(
          ORDER_STATUS?.[`${status}`]
        )}, ${0.2})`,
        color: ORDER_STATUS?.[`${status}`]
      }}
    >
      {label || status}
    </p>
  );
};

export default StatusBtn;
