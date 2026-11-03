import { Product } from "@/app/types/general";
import { currency } from "@/app/utils/currency";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
  onAdd: (productId: string) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="card hover:bg-white!">
      <div className="flex flex-col items-center">
        <Image src={product.imageUrl} alt={product.name} width={200} height={200} />
        <div className="flex justify-between items-center w-full px-4">
          <h2 className="font-semibold text-lg text-slate-800">{product.name}</h2>
          <p className="text-sm text-slate-600">{currency(product.price)}</p>
        </div>
      </div>

      <button className="button-cart" disabled={!product.available} onClick={() => onAdd(product.id)}>
        {product.available ? "Add to cart" : "Out of stock"}
      </button>
    </article>
  );
}
