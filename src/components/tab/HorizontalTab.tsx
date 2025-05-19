import { useState } from "react";

interface Props {
  tabs: string[];
  onTabChanged?: (newTab: string, prevTab: string) => void;
}

export default function HorizontalTab({ tabs, onTabChanged = () => { } }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return <div
    className="flex flex-row rounded-2xl border-slate-200 border-solid border-1 w-fit overflow-hidden divide-x-1 divide-slate-200"
  >
    {
      tabs.map((t, i) => (
        t === activeTab ?
          <button
            key={i}
            id={`tab-${t} tab`}
            className="appearance-none p-2 bg-slate-100 hover:bg-slate-200"
          >
            {t}
          </button>
          :
          <button
            key={i}
            id={`tab-${t} tab`}
            className="appearance-none p-2 hover:bg-slate-200"
            onClick={() => {
              const prevTab = activeTab;
              setActiveTab(t);
              onTabChanged(t, prevTab);
            }}
          >
            {t}
          </button>
      ))
    }
  </div>
}