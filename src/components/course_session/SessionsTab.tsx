import { useState } from "react";
import HorizontalTab from "../tab/HorizontalTab";
import AttendCard from "../cards/AttendCard";
import MaterialCard from "../cards/MaterialCard";

export default function SessionsTab() {
  const [activeTab, setActiveTab] = useState("Session 1");

  const tabs = Array.from({ length: 24 }, (_, i) => ({
    label: `Session ${i + 1}`,
  }));

  return (
    <>
      <HorizontalTab
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <AttendCard />
      <MaterialCard
        type="pdf"
        title="Lecture 1: Dynamic Programming"
        subtitle="Uploaded 2 days ago"
        onClick={() => {}}
      />
      <MaterialCard
        type="ppt"
        title="Lecture 1: Dynamic Programming"
        subtitle="Uploaded 2 days ago"
        onClick={() => {}}
      />
      <MaterialCard
        type="video"
        title="Lecture 1: Dynamic Programming"
        subtitle="Uploaded 2 days ago"
        onClick={() => {}}
      />
    </>
  );
}
