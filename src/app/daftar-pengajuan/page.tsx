import { Metadata } from "next";
import Content from "@/components/daftar-pengajuan/content";
export const metadata: Metadata = {
  title: "Daftar Pengajuan Judul",
  description: "Daftar Pengajuan Judul",
};
export default function PengajuanPage() {
  return (
    <>
      <Content />
    </>
  );
}
