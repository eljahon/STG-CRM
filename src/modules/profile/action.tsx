import ProfileSettingPage from "./ui/setting";
import ProfilePasswordPage from "./ui/password";
import TabBar from "./ui/tab-bar";
import { useSearchParams } from "react-router-dom";
import FinancePage from "./ui/finance";
import ProfileSettingSelerPage from "./ui/seller-profile";

const ProfilePage = () => {
  const [params] = useSearchParams();
  return (
    <>
      <TabBar />
      {params.get("status") == "password" ? (
        <ProfilePasswordPage />
      ) : params.get("status") == "finance" ? (
        <FinancePage />
      ) : params.get("status") == "profile-seller" ? (
        <ProfileSettingSelerPage />
      ) : (
        <ProfileSettingPage />
      )}
    </>
  );
};

export default ProfilePage;
