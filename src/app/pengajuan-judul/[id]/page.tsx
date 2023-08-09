import { Metadata } from "next";
import ContentPagePengajuanJudul from "@/components/pengajuan-judul/content";

export const metadata: Metadata = {
  title: "Form Pengajuan Judul",
  description: "Form Pengajuan Judul",
};

export default function PagePengajuanJudul({
  params,
}: {
  params: { id: string };
}) {
  const id_gelombang = params.id;
  return <ContentPagePengajuanJudul id={id_gelombang} />;
}
