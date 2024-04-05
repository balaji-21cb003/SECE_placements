import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

export default function ThirdYear() {
  const courses = [
    {
      courseName: "Artificial Intelligence and Data Science (AIDS)",
      dept: "AIDS",
    },
    { courseName: "Computer Science and Engineering (CSE) ", dept: "CSE" },
    // { courseName: "Computer Science and Engineering (CSE) -B", dept: "CSE" },
    // { courseName: "Computer Science and Engineering (CSE) -C", dept: "CSE" },
    {
      courseName: "Computer Science and Business Systems (CSBS)",
      dept: "CSBS",
    },
    { courseName: "Computer and Communication Engineering (CCE)", dept: "CCE" },
    { courseName: "Information Technology (IT)", dept: "IT" },
    {
      courseName: "Electronics and Communication Engineering (ECE)",
      dept: "ECE",
    },
    // {
    //   courseName: "Electronics and Communication Engineering (ECE) - B",
    //   dept: "ECE",
    // },
    // {
    //   courseName: "Electronics and Communication Engineering (ECE) - C",
    //   dept: "ECE",
    // },
    { courseName: "Electrical & Electronics Engineering (EEE)", dept: "EEE" },
    { courseName: "Mechanical Engineering (MECH)", dept: "MECH" },
  ];

  return (
    <div>
      <Navbar />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#1f2937] py-6 sm:py-12">
        <div className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {courses.map((course, index) => (
            <Link
              key={index}
              to={`/thirdyear/${encodeURIComponent(course.dept)}`}
              className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg"
            >
              <span className="absolute top-10 mt-11 ml-[200px] z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
              <div className="relative z-10 space-y-6 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <h2 className="text-xl font-semibold">{course.courseName}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
