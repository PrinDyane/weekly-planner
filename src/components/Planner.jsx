import React from "react";
import DayColumn from "./DayColumn";

//planner componet
const Planner = ({user, onLogout}) => {
  //list of days to display columns for each day the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday',
         'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
      <div className="min-h-screen bg-[#f8f8f8] p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#24E290]"> 
            Hello, {user}! 📝
          </h1>
          <button onClick={onLogout}
          className="bg-[#F7A458] text-white font-bold border-none px-4 py-2 rounded hover:bg-[#24E290] transition">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {daysOfWeek.map((day) => (
            <DayColumn key={day} day={day} user={user} />
          ))}
        </div>
      </div>
    );     
};

export default Planner;