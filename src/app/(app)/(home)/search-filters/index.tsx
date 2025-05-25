"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="bg-black text-white px-4 lg:px-12 py-8 border-b flex flex-col border-b-gray-500 gap-4" style={{backgroundColor: "#000000"}}>
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="bg-black text-white px-4 lg:px-12 py-8 border-b flex flex-col border-b-gray-500 gap-4"
      style={{ backgroundColor: "#000000" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
