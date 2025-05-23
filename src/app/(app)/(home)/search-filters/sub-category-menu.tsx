import { Category } from "@/payload-types";
import Link from "next/link";
import { CustomCategory } from "../types";

interface Props {
  category: CustomCategory;
  isOpen: boolean;
}

export const SubCategoryMenu = ({ category, isOpen }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgorundColor = category.color || "#F5F5F5";

  return (
    <div
      className="absolute z-100"
      style={{
        top: "100%",
        left: 0,
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor: backgorundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-white hover:text-black flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
