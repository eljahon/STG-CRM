import ProfileSettingPage from "./ui/setting";
import ProfilePasswordPage from "./ui/password";
import TabBar from "./ui/tab-bar";
import { useSearchParams } from "react-router-dom";
import FinancePage from "./ui/finance";

const ProfilePage = () => {
  const [params] = useSearchParams();
  return (
    <>
      <TabBar />
      {params.get("status") == "security" ? (
        <ProfilePasswordPage />
      ) : params.get("status") == "finance" ? (
        <FinancePage />
      ) : (
        <ProfileSettingPage />
      )}
    </>
  );
};

export default ProfilePage;
