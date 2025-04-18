import React from "react";
import AnimatedCount from "./AnimatedCount";

const DashboardTiles = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="card rounded-lg px-6 py-4 shadow-md h-30 w-full flex gap-6"
        >
          <div className="text-primary dark:text-white text-5xl h-11 w-11 py-1.5">
            {item?.icon}
          </div>
          <div className="">
            <strong className="text-2xl text-black dark:text-white font-semibold flex gap-3">
              {item?.prefix ? item?.prefix : null}
              <AnimatedCount value={item?.amount} />
            </strong>
            <div>
              <span className="text-sm text-gray-500 dark:text-white font-small">
                {item?.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardTiles;
