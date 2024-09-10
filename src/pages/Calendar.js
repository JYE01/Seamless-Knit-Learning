import React from "react";
import Date from "../components/Date";

const Calendar = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-8">Calendar</h1>
        <div className="space-y-6">
          <Date />
        </div>
    </div>
  );
};

export default Calendar;