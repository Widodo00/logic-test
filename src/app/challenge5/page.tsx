"use client";

import { Tabs } from "@/components/tabs";
import { useState } from "react";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

const tabs: TabItem[] = [
  {
    id: "1",
    label: "Overview",
    content: (
      <div className="content-tab">
        <p className="text-sm text-blue-600">Content Overview</p>
        <p className="text-xs text-slate-500">
          This is the overview content containing Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam
          urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos
          himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet
          mauris pharetra vestibulum fusce dictum risus.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    label: "Activity",
    content: (
      <div className="content-tab">
        <p className="text-sm text-blue-600">Content Activity</p>
        <p className="text-xs text-slate-500">
          This is the activity content containing Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam
          urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos
          himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet
          mauris pharetra vestibulum fusce dictum risus.
        </p>
      </div>
    ),
  },
  {
    id: "3",
    label: "Settings",
    content: (
      <div className="content-tab">
        <p className="text-sm text-blue-600">Content Settings</p>
        <p className="text-xs text-slate-500">
          This is the overview settings containing Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam
          urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos
          himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet
          mauris pharetra vestibulum fusce dictum risus.
        </p>
      </div>
    ),
  },
];

export default function Challenge5() {
  const [activeId, setActiveId] = useState<string>("1");

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-4xl">Challenge 5</h1>
        <p className="text-sm text-slate-500">Build an Accessible Tabs Component</p>
      </div>

      <div className="box p-0!">
        <Tabs tabs={tabs} activeId={activeId} onChange={(value) => setActiveId(value)} />
        <div className="p-4" role="tabpanel" id={`panel-${activeId}`} aria-labelledby={`tab-${activeId}`} tabIndex={0}>
          {tabs.find((item) => item.id === activeId)?.content}
        </div>
      </div>
    </>
  );
}
