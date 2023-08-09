import ContentPageBimbingan from "@/components/bimbingan/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bimbingan",
};

export default function PageBimbingan() {
  return (
    <>
      <ContentPageBimbingan />
    </>
  );
}
