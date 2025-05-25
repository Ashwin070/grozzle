"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const router = useRouter();

  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[1] | null
  >(null);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "black";

  const isSubcategoryView = !!parentCategories;

  const textColorClass = isSubcategoryView ? "text-black" : "text-white";
  const hoverTextColorClass = isSubcategoryView
    ? "hover:text-white"
    : "hover:text-black";
  const hoverBgColorClass = isSubcategoryView
    ? "hover:bg-black"
    : "hover:bg-white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className={`p-0 transition-none ${isSubcategoryView ? "border-r border-black" : "border-r"}`}
        data-subcategory-open={isSubcategoryView ? "true" : "false"}
        style={{
          backgroundColor: backgroundColor,
          color: isSubcategoryView ? "black" : "white",
        }}
      >
        <SheetHeader
          className={`p-4 border-b ${isSubcategoryView ? "border-black" : "border-white"}`}
        >
          <SheetTitle className={textColorClass}>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className={`w-full text-left p-4 ${hoverBgColorClass} ${hoverTextColorClass} flex items-center text-base font-medium cursor-pointer ${textColorClass}`}
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className={`w-full cursor-pointer text-left p-4 ${hoverBgColorClass} ${hoverTextColorClass} flex justify-between items-center text-base font-medium ${textColorClass} hover:underline`}
            >
              {category.name}
              {category.subcategories?.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
