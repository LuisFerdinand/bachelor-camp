import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCT_IMAGE_FALLBACK } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageIcon } from "lucide-react";

interface ProductImageProps {
  title: string;
  imageUrl?: string | null;
  galleries?: {
    id: string;
    storeProductId: string;
    imageUrl: string;
    position: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const ProductImageSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <Skeleton className="size-full" />
    </div>
  );
};

export const ProductImage = ({
  title,
  imageUrl,
  galleries = [],
}: ProductImageProps) => {
  const fallbackImage = imageUrl;
  const galleryImage = galleries[0]?.imageUrl;
  const displayImage = galleryImage || fallbackImage;
  const extraCount = galleries.length > 1 ? galleries.length - 1 : 0;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
      {displayImage ? (
        <>
          <Image src={displayImage} alt={title} fill className="object-cover" />
          {extraCount > 0 && (
            <span className="absolute bottom-1 right-1 text-xs bg-black/60 text-white rounded px-1.5 py-0.5">
              +{extraCount}
            </span>
          )}
        </>
      ) : (
        <Avatar className="size-full rounded-lg border-2 border-border shadow-sm">
          <AvatarImage src={imageUrl || undefined} alt={title} />
          <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
