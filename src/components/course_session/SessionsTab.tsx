import { useState } from "react";
import HorizontalTab from "../tab/HorizontalTab";
import AttendCard from "./AttendCard";

export default function SessionsTab() {
  const [activeTab, setActiveTab] = useState('Session 1');

  const tabs = Array.from({ length: 24 }, (_, i) => ({
    label: `Session ${i + 1}`
  }));

  return (
    <>
      <HorizontalTab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <AttendCard />
    </>
  );
}
