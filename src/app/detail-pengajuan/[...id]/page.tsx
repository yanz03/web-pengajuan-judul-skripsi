import { Metadata } from "next";
import ContentPageDetailPengajuan from "@/components/detail-pengajuan/content";

export const metadata: Metadata = {
  title: "Detail Pengajuan",
  description: "Detail Pengajuan",
};

export default function DetailPengajuan({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  return (
    <>
      <ContentPageDetailPengajuan
        id_pengajuan={id[0]}
        id_gelombang={id[1]}
        id_mahasiswa={id[2]}
      />
    </>
  );
}
