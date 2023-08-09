import ProfileContent from "@/components/profile/ProfileContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Website Pengajuan Judul Skripsi",
};
const ProfilePage = () => {
  return <ProfileContent />;
};

export default ProfilePage;
