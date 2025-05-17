import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none bg-black border-r-gray-500"
      >
        <SheetHeader className="p-4 border-b border-b-gray-500">
          <div>
            <SheetTitle className="text-white">Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="w-full text-left p-4 hover:bg-white hover:text-black flex items-center text-base font-medium text-white"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t ">
            <Link
              href="/sign-in"
              className="w-full text-left p-4 hover:bg-white hover:text-black flex items-center text-base font-medium text-white"
              onClick={() => onOpenChange(false)}
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="w-full text-left p-4 hover:bg-white hover:text-black flex items-center text-base font-medium text-white"
              onClick={() => onOpenChange(false)}
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
