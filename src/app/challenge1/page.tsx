"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

type Product = {
  id: string;
  name: string;
};

type FormSearch = {
  query: string;
  page: number;
  pageSize: number;
};

const data: Product[] = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Orange" },
  { id: "3", name: "Banana" },
  { id: "4", name: "Mango" },
  { id: "5", name: "Watermelon" },
  { id: "6", name: "Melon" },
  { id: "7", name: "Grape" },
  { id: "8", name: "Strawberry" },
  { id: "9", name: "Pineapple" },
  { id: "10", name: "Papaya" },
  { id: "11", name: "Durian" },
  { id: "12", name: "Rambutan" },
  { id: "13", name: "Snake Fruit" },
  { id: "14", name: "Avocado" },
  { id: "15", name: "Guava" },
  { id: "16", name: "Dragon Fruit" },
  { id: "17", name: "Pear" },
  { id: "18", name: "Coconut" },
  { id: "19", name: "Mangosteen" },
  { id: "20", name: "Longan" },
];

export default function Challenge1() {
  const [formSearch, setFormSearch] = useState<FormSearch>({
    page: 1,
    pageSize: 5,
    query: "",
  });

  const [newQuery] = useDebounce(formSearch.query, 500);
  const optionPageSize = [1, 5, 10];

  function searchProducts(data: Product[], query: string, page: number, pageSize: number): Product[] {
    const start = ((page <= 1 ? 1 : page) - 1) * pageSize;
    if (pageSize < 1) return [];

    return data
      .filter((item: Product) => item.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      .slice(start, start + pageSize);
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-4xl">Challenge 1</h1>
        <p className="text-sm text-slate-500">Filter, Sort, and Paginate Products</p>
      </div>

      <div className="box">
        <input className="input-custom" placeholder="Search product..." value={formSearch.query} onChange={(evt) => setFormSearch((prev) => ({ ...prev, query: evt.target.value, page: 1 }))} />
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {searchProducts(data, newQuery, formSearch.page, formSearch.pageSize).map((item) => (
            <div key={item.id} className="card">
              {item.name}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-6 text-xs">
          <div className="flex gap-2 items-center">
            <p className="text-slate-400">Rows per page</p>
            <select className="text-title" onChange={(evt) => setFormSearch((prev) => ({ ...prev, page: 1, pageSize: Number(evt.target.value) }))} value={formSearch.pageSize}>
              {optionPageSize.map((item: number) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <button className="button-page" disabled={formSearch.page === 1} onClick={() => setFormSearch((prev) => ({ ...prev, page: formSearch.page - 1 }))}>
              Prev
            </button>
            <p className="text-blue-500 font-semibold px-1">{formSearch.page}</p>
            <button
              className="button-page"
              disabled={formSearch.page >= Math.ceil(data.filter((item) => item.name.toLowerCase().includes(newQuery.toLowerCase())).length / formSearch.pageSize)}
              onClick={() => setFormSearch((prev) => ({ ...prev, page: formSearch.page + 1 }))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
