import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface Props {
  data: any;
}
export const SearchFilters = ({ data }: Props) => {
  return (
    <div className="bg-[#232322] text-white px-4 lg:px-12 py-8 border-b flex flex-col border-b-gray-500 gap-4">
      <SearchInput />
      <Categories data={data} />
    </div>
  );
};
