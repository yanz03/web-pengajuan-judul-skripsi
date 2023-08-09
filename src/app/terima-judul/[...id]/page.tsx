import ContentPageTerimaJudul from "@/components/terima-judul/content";

export default function PageTerimaJudul({
  params,
}: {
  params: { id: string };
}) {
  const id_pengajuan = params.id[0];
  const id_gelombang = params.id[1];
  const id_mahasiswa = params.id[2];
  return (
    <ContentPageTerimaJudul
      id_pengajuan={id_pengajuan}
      id_gelombang={id_gelombang}
      id_mahasiswa={id_mahasiswa}
    />
  );
}
