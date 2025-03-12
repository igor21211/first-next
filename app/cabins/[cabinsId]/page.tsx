import Reservation from "@/app/_components/Reservation";
import {
  Cabin as CabinType,
  getCabin,
  getCabins,
} from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

type Params = Promise<{ cabinsId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { cabinsId } = await params;
  const cabin: CabinType | null = await getCabin(parseInt(cabinsId));
  if (!cabin) {
    return {
      title: "Cabin not found",
      description: "Cabin not found",
    };
  }
  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinsId: cabin.id.toString(),
  }));
}

export default async function Page({ params }: { params: Params }) {
  const cabin = await getCabin(parseInt((await params).cabinsId));
  if (!cabin) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
