import { Metadata } from "next";
import ContentAddAccountPage from "@/components/add-account/ContentAddAcountPage";

export const metadata: Metadata = {
  title: "Add account",
  description: "Website pengajuan judul skripsi",
};

export default function AddAccountPage() {
  return <ContentAddAccountPage />;
}
