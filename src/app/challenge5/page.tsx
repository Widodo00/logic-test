"use client";

import { useRef, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

const tabs: TabItem[] = [
  { id: "1", label: "Tab1", content: <div>Berisi Tab 1</div> },
  { id: "2", label: "Tab2", content: <div>Berisi Tab 2</div> },
  { id: "3", label: "Tab3", content: <div>Berisi Tab 3</div> },
];

export default function Challenge5() {
  const [activeId, setActiveId] = useState<string>("1");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    e.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    setActiveId(tabs[nextIndex].id);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {tabs.map((item, index) => (
          <button
            key={item.id}
            className={`rounded-lg cursor-pointer px-4 py-2 ${activeId === item.id ? "bg-blue-600 active:bg-blue-800 transition-all text-white" : "text-black"}`}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            tabIndex={activeId === item.id ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${activeId}`} aria-labelledby={`tab-${activeId}`}>
        {tabs.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
}
