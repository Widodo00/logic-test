"use client";

import ProductCard from "@/components/productCard";
import { Product } from "../types/general";

const data: Product[] = [
  { id: "1", name: "Apple", imageUrl: "https://picsum.photos/200", price: 35000, available: true },
  { id: "2", name: "Orange", imageUrl: "https://picsum.photos/200", price: 25000, available: false },
  { id: "3", name: "Banana", imageUrl: "https://picsum.photos/200", price: 18000, available: true },
  { id: "4", name: "Mango", imageUrl: "https://picsum.photos/200", price: 30000, available: true },
  { id: "5", name: "Watermelon", imageUrl: "https://picsum.photos/200", price: 15000, available: false },
  { id: "6", name: "Melon", imageUrl: "https://picsum.photos/200", price: 22000, available: true },
  { id: "7", name: "Grape", imageUrl: "https://picsum.photos/200", price: 85000, available: true },
  { id: "8", name: "Strawberry", imageUrl: "https://picsum.photos/200", price: 65000, available: false },
  { id: "9", name: "Pineapple", imageUrl: "https://picsum.photos/200", price: 12000, available: true },
  { id: "10", name: "Papaya", imageUrl: "https://picsum.photos/200", price: 14000, available: false },
  { id: "11", name: "Durian", imageUrl: "https://picsum.photos/200", price: 75000, available: true },
  { id: "12", name: "Rambutan", imageUrl: "https://picsum.photos/200", price: 20000, available: true },
  { id: "13", name: "Snake Fruit", imageUrl: "https://picsum.photos/200", price: 28000, available: false },
  { id: "14", name: "Avocado", imageUrl: "https://picsum.photos/200", price: 32000, available: true },
  { id: "15", name: "Guava", imageUrl: "https://picsum.photos/200", price: 16000, available: true },
  { id: "16", name: "Dragon Fruit", imageUrl: "https://picsum.photos/200", price: 25000, available: false },
  { id: "17", name: "Pear", imageUrl: "https://picsum.photos/200", price: 40000, available: true },
  { id: "18", name: "Coconut", imageUrl: "https://picsum.photos/200", price: 10000, available: false },
  { id: "19", name: "Mangosteen", imageUrl: "https://picsum.photos/200", price: 45000, available: true },
  { id: "20", name: "Longan", imageUrl: "https://picsum.photos/200", price: 55000, available: false },
];

export default function Challenge4() {
  function onAdd(id: string) {
    console.log(`Add cart id ${id}`);
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-4xl">Challenge 4</h1>
        <p className="text-sm text-slate-500">Build a Product Card Component</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.map((item: Product) => (
          <ProductCard product={item} onAdd={onAdd} key={item.id} />
        ))}
      </div>
    </>
  );
}
