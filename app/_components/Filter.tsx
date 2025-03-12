"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filters = [
    { label: "All cabins", filter: "all" },
    { label: "1—3 guests", filter: "small" },
    { label: "4—7 guests", filter: "medium" },
    { label: "8—12 guests", filter: "large" },
  ];
  return (
    <div className="border border-primary-800 flex">
      {filters.map((filter) => (
        <FilterButton
          key={filter.filter}
          filter={filter.filter}
          label={filter.label}
          activeFilter={activeFilter}
          handleFilter={handleFilter}
        />
      ))}
    </div>
  );
};

const FilterButton = ({
  label,
  filter,
  activeFilter,
  handleFilter,
}: {
  label: string;
  filter: string;
  activeFilter: string;
  handleFilter: (filter: string) => void;
}) => {
  return (
    <button
      className={`hover:bg-primary-700 px-5 py-2 ${
        activeFilter === filter ? "bg-primary-700" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {label}
    </button>
  );
};

export default Filter;
