"use client"
import React,{useState} from 'react'
import HeaderSetting from './components/HeaderSetting';
import FooterSetting from './components/FooterSetting';
import Module from './components/Module';

export default function page() {
    const [active, setActive] = useState("header");
    const tabs = [
    { id: "header", title: "Header" },
    { id: "footer", title: "Footer" },
    { id: "module", title: "Module" },
  ];
  return (
    <div className="p-4">

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={
              "px-4 py-2 mr-2 border-b-2 text-sm font-semibold transition " +
              (active === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-black")
            }
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white p-4 rounded shadow">
        {active === "header" && <HeaderSetting></HeaderSetting>}
        {active === "footer" && <FooterSetting></FooterSetting>}
        {active === "module" && <Module></Module>}
      </div>
    </div>
  )
}
