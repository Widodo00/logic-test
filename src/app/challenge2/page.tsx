"use client";

import { useState } from "react";

type Form = {
  pattern: string;
  pathname: string;
};

export default function Challenge2() {
  const [patternList, setPatternList] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [form, setForm] = useState<Form>({
    pathname: "",
    pattern: "",
  });

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

  function handleAdd() {
    setPatternList((prev) => [...prev, form.pattern]);
    setForm((prev) => ({ ...prev, pattern: "" }));
    setResult(null);
  }

  function handleSearch() {
    setResult(findRoute(patternList, form.pathname));
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-4xl">Challenge 2</h1>
        <p className="text-sm text-slate-500">Resolve the Best Matching Route</p>
      </div>

      <div className="box">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 w-full">
              <input className="input-custom" placeholder="Input pattern" value={form.pattern} onChange={(evt) => setForm((prev) => ({ ...prev, pattern: evt.target.value }))} />
              <button className="button-cart py-1.5!" onClick={handleAdd} disabled={!form.pattern}>
                Add
              </button>
            </div>
            <div className="box text-slate-500 text-sm gap-1!">
              <p className="font-semibold w-full pb-2 border-b border-slate-400">Pattern List</p>
              {patternList.map((item, index) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <input
                className="input-custom"
                placeholder="Input pattern"
                value={form.pathname}
                onChange={(evt) => {
                  setForm((prev) => ({ ...prev, pathname: evt.target.value }));
                  setResult(null);
                }}
              />
              <button className="button-cart py-1.5!" onClick={handleSearch} disabled={!form.pathname}>
                Search
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              Route Match Index: <span className="font-normal">{result}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
