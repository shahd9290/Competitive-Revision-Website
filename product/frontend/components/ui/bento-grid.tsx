import { cn } from "@/lib/utils";
import { Children } from "react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Link from "next/link";

// Bento Grid component made available for public use via Aceternity UI - https://ui.aceternity.com/components/bento-grid

export const BentoGrid = ({
  className,
  children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    const childCount = Children.count(children);

    return (
        <div
            className={cn(
                childCount <= 4
                    ? "flex items-center justify-center gap-4 lg:gap-20 min-h-[80vh] px-6 py-8"
                    : "grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-20  max-w-7xl mx-auto px-6 md:px-10 py-14",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
  className,
  title,
  topics
}: {
    className?: string;
    title?: string | React.ReactNode;
    topics?: [];
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={cn(
                        "aspect-square rounded-xl group/bento hover:shadow-xl transition-all duration-200 shadow-input p-4 " +
                        "bg-[#D9D9D9] border border-transparent justify-center items-center flex flex-col space-y-4",
                        "w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem]",
                        className
                    )}
                    type="button"
                >
                    <div className="group-hover/bento:scale-110 transition duration-200 text-gray-900">
                        <div className="text-center font-sans font-bold mb-2 mt-2">
                            {title}
                        </div>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg shadow-lg p-6">
                <DialogTitle>{title}</DialogTitle>
                {topics && topics.length > 0 ? (topics.map((topic, i) => (
                    <DialogDescription key={i}>
                        <Link href={{
                            pathname: "/quiz",
                            query: {id: topic.id},
                        }}>{topic.name}</Link>
                    </DialogDescription>
                ))):(
                    <DialogDescription>No Topics Found!</DialogDescription>)
                }
            </DialogContent>
        </Dialog>
    );
};
