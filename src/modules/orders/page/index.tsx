import OrdersCard from "../../../ui/list/order-cards";
import TabBar from "../../../ui/tab-bar";
// import OrderTitle from "../ui/title";
import TopFilter from "../ui/top-filter";

const OrderPage = () => {
  return (
    <div className="mt-5 tabhight">
      {/* <OrderTitle tableTile="Orders" className="mb-4" /> */}
      <div className="w-full flex gap-5">
        <TabBar title={"Order"} Items={["hello", "hello"]} />

        <div className="w-full">
          <TopFilter title={"Order"} />
          <div className="w-full flex flex-column gap-3 mt-4">
            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"seccess"}
              img={
                "https://agromart-agronom.s3.eu-central-1.amazonaws.com/other/buzzard_bird_branch_1220002_2862x3578 (1).jpg"
              }
            />

            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"seccess"}
              img={
                "https://agromart-agronom.s3.eu-central-1.amazonaws.com/other/buzzard_bird_branch_1220002_2862x3578 (1).jpg"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
