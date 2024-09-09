import React from "react";

const Calendar = () => {
  return (
    <div className="container p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500 mb-4 text-sm"> {/* Reduced font size */}
          Here you can manage your events and tasks related to knitting.
        </p>
        <div className="grid grid-cols-7 gap-2 text-center text-sm"> {/* Reduced font size */}
          <div className="day">Sun</div>
          <div className="day">Mon</div>
          <div className="day">Tue</div>
          <div className="day">Wed</div>
          <div className="day">Thu</div>
          <div className="day">Fri</div>
          <div className="day">Sat</div>
          {/* Example days in the calendar */}
          {[...Array(28)].map((_, index) => (
            <div key={index} className="day-box text-sm"> {/* Reduced font size */}
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
