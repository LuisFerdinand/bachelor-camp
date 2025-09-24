import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCT_IMAGE_FALLBACK } from "@/constants";

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
  const fallbackImage = imageUrl || PRODUCT_IMAGE_FALLBACK;
  const galleryImage = galleries[0]?.imageUrl;
  const displayImage = galleryImage || fallbackImage;
  const extraCount = galleries.length > 1 ? galleries.length - 1 : 0;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
      <Image src={displayImage} alt={title} fill className="object-cover" />
      {extraCount > 0 && (
        <span className="absolute bottom-1 right-1 text-xs bg-black/60 text-white rounded px-1.5 py-0.5">
          +{extraCount}
        </span>
      )}
    </div>
  );
};
