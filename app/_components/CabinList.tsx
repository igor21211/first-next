import { Cabin, getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }: { filter: string }) {
  /*   noStore(); */
  const cabins: Cabin[] = await getCabins();
  if (cabins.length === 0) {
    return <p>No cabins found</p>;
  }

  let displayCabins;
  if (filter === "all") {
    displayCabins = cabins;
  }
  if (filter === "small") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins &&
        displayCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
    </div>
  );
}
