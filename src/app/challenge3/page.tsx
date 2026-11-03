"use client";

import { useState } from "react";

type BreadCrumb = {
  label: string;
  href: string;
};

const labelList = {
  products: "Shop",
};

export default function Challenge3() {
  const [result, setResult] = useState<BreadCrumb[]>([]);
  const [form, setForm] = useState<string>("");

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

  function handleSearch() {
    setResult(buildBreadcrumbs(form, labelList));
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-4xl">Challenge 3</h1>
        <p className="text-sm text-slate-500">Build a Safe Breadcrumb Trail</p>
      </div>

      <div className="box">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <p className="font-semibold w-full pb-2 border-b border-slate-400">Labels:</p>
            {Object.entries(labelList).map(([key, value]) => (
              <p key={key} className="text-sm">
                {key}: {value}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <input
                className="input-custom"
                placeholder="Input pattern"
                value={form}
                onChange={(evt) => {
                  setForm(evt.target.value);
                  setResult([]);
                }}
              />
              <button className="button-cart py-1.5!" onClick={handleSearch} disabled={!form}>
                Generate
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {result.map((item, index) => (
                <p className="text-sm text-slate-500" key={index}>
                  <span className="font-semibold">label:</span> {item.label}, href: {item.href}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
