const OrderTitle = ({ tableTile, className }: any) => {
  return (
    <div
      className={`flex flex-wrap gap-2 align-items-center justify-content-between border-none ${
        className && className
      }`}
    >
      {tableTile && <h4 className="m-0 text-3xl">{tableTile}</h4>}
    </div>
  );
};

export default OrderTitle;
