import type { Metadata } from "next";
import { DealerClient } from "./dealer-client";

export const metadata: Metadata = {
  title: "Дилер / Шоурум — JETOUR",
  description:
    "JETOUR-ийн албан ёсны showroom (SAIN MOTORS), Улаанбаатар. Хаяг, ажлын цаг, газрын зураг, холбоо барих.",
  alternates: { canonical: "/dealer" },
};

export default function DealerPage() {
  return <DealerClient />;
}
