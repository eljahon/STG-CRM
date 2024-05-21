import OrdersCard from "../../../ui/list/order-cards";
import TabBar from "../../../ui/tab-bar";
// import TopFilter from "../ui/top-filter";

const OrderPage = () => {
  return (
    <div className="mt-5 tabhight">
      <div className="w-full flex gap-5">
        <TabBar title={"Order"} Items={["hello", "hello"]} />

        <div className="w-full">
          {/* <TopFilter title={"Order"} /> */}
          <div className="w-full flex flex-column gap-3">
            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"pending"}
            />
            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"accepted"}
            />
            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"shipping"}
            />
            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"completed"}
            />
            <OrdersCard
              column={[
                { label: "Title", text: "Research" },
                { label: "Estimate", text: "2d 4h" }
              ]}
              status={"cancelled"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
