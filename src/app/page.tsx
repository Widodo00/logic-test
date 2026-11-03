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

type BreadCrumb = {
  label: string;
  href: string;
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

export default function Home() {
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

  function findRoute(patterns: string[], pathname: string): number {
    const newPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const pathArr = newPathname.split("/");

    for (let index = 0; index < patterns.length; index++) {
      const newPattern = patterns[index].endsWith("/") ? patterns[index].slice(0, -1) : patterns[index];
      const patternArr = newPattern.split("/");

      if (pathArr.length === patternArr.length) {
        let match = true;

        for (let index2 = 0; index2 < patternArr.length; index2++) {
          if (patternArr[index2][0] !== ":") {
            if (patternArr[index2] !== pathArr[index2]) {
              match = false;
              break;
            }
          } else {
            if (!pathArr[index2]) {
              match = false;
              break;
            }
          }
        }

        if (match) {
          return index;
        }
      }
    }

    return -1;
  }

  function buildBreadcrumbs(pathname: string, labels: Record<string, string>): BreadCrumb[] {
    if (pathname === "/") {
      return [];
    }

    const newPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const pathnameArr = newPathname.slice(1).split("/");
    const result: BreadCrumb[] = [];
    pathnameArr.forEach((item, index) => {
      let temp = "/";
      for (let i = 0; i <= index; i++) {
        temp = temp + encodeURIComponent(pathnameArr[i]) + (i === index ? "" : "/");
      }

      result.push({
        label: labels[item] ?? decodeURIComponent(item),
        href: temp,
      });
    });

    return result;
  }

  return (
    <div>
      <input className="px-3 py-1.5 rounded-lg border-slate-500 border" value={formSearch.query} onChange={(evt) => setFormSearch((prev) => ({ ...prev, query: evt.target.value, page: 1 }))} />

      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {searchProducts(data, newQuery, formSearch.page, formSearch.pageSize).map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>

      <div className="flex self-end gap-3">
        <select className="text-title" onChange={(evt) => setFormSearch((prev) => ({ ...prev, page: 1, pageSize: Number(evt.target.value) }))} value={formSearch.pageSize}>
          {optionPageSize.map((item: number) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          <button className="button-page" disabled={formSearch.page === 1} onClick={() => setFormSearch((prev) => ({ ...prev, page: formSearch.page - 1 }))}>
            Prev
          </button>
          <p>{formSearch.page}</p>
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
  );
}
