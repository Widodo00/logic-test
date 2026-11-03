import { TabItem } from "@/app/types/general";
import React, { useRef } from "react";

type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs(props: TabsProps): React.JSX.Element {
  const tabRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % props.tabs.length;
        break;

      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = props.tabs.length - 1;
        break;

      default:
        return;
    }

    e.preventDefault();
    tabRef.current[nextIndex]?.focus();
    props.onChange(props.tabs[nextIndex].id);
  };

  return (
    <div role="tablist" aria-label="Challenge tabs" className="flex gap-1 rounded-t-md px-6 bg-slate-200 text-sm text-slate-600">
      {props.tabs.map((item, index) => (
        <button
          key={item.id}
          className={`transition-all cursor-pointer p-4 ${props.activeId === item.id ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
          // className={`rounded-lg cursor-pointer px-4 py-2 transition-all ${props.activeId === item.id ? "bg-blue-600 active:bg-blue-800 text-white" : "text-black"}`}
          onClick={() => props.onChange(item.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(e) => {
            tabRef.current[index] = e;
          }}
          role="tab"
          aria-selected={props.activeId === item.id}
          aria-controls={`panel-${item.id}`}
          id={`tab-${item.id}`}
          tabIndex={props.activeId === item.id ? 0 : -1}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
