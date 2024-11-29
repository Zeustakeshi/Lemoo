import ProfileCard from "./ProfileCard";
import AnnouncementCard from "./AnnouncementCard";
import OnboardingTasks from "./OnboardingTasks";
import LazadaUniversity from "./LazadaUniversity";
import LogoutButton from "./Auth/LogoutButton";

const HomePageUI = () => {
  return (
    <div className="homepage-container max-w-screen-2xl">
      <LogoutButton />
      {/* User Info */}
      <div className="flex flex-col md:flex-row gap-4">
        <ProfileCard />
        <AnnouncementCard />
      </div>
      {/* Onboarding Task */}
      <OnboardingTasks />

      {/* Lazada University Section */}
      <LazadaUniversity />
    </div>
  );
};

export default HomePageUI;
