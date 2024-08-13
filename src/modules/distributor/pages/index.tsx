import { useSearchParams } from "react-router-dom";
import Alldistributors from "../ui/all-distributors";
import Mydistributors from "../ui/my-distributors";
// import TabBar from "../ui/tab-bar";

const DistributorPage = () => {
  const [params] = useSearchParams();
  return (
    <div className="mt-5 tabhight w-full">
      <div className="w-full flex gap-5 flex-column lg:flex-row">
        {/* <TabBar /> */}
        {params.get("type") == "my" ? <Mydistributors /> : <Alldistributors />}
      </div>
    </div>
  );
};

export default DistributorPage;
