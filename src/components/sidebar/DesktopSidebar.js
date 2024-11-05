import React from "react";
import SidebarContent from "./SidebarContent";

const DesktopSidebar = () => {
  return (
    <aside className="z-30 flex-shrink-0 hidden shadow-sm w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block" style={{backgroundColor:"#0069b5"}}>
      <SidebarContent id="styleLink" />
    </aside>
  );
};

export default DesktopSidebar;
