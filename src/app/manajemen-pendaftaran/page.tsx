import { Metadata } from "next";
import Content from "@/components/manajemen-pendaftaran/content";
export const metadata: Metadata = {
  title: "Manajemen Pendaftaran",
  description: "Manajemen Pendaftaran",
};
export default function Page() {
  return <Content />;
}
