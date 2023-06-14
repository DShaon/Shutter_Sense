import React, { useEffect, useState } from "react";

const PopularInstructor = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes/approved");
        const data = await response.json();

        const sortedClasses = data.sort(
          (a, b) => b.enrollCount - a.enrollCount
        );
        setClasses(sortedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="mb-16 mt-28">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Meet Our Talented Photography Instructors
        </h1>
        <p className="  text-justify text-white">
          Get inspired by our top 6 photography instructors who bring a wealth
          of experience and expertise to our photography school. Each instructor
          has a unique style and approach, ensuring a diverse learning
          experience for our students. Learn from the best in the industry and
          unlock your creative potential under their guidance. Explore their
          portfolios and join their classes to embark on an exciting photography
          journey!
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4  items-center">
        {classes.slice(0, 8).map((classItem) => (
          <div
            key={classItem._id}
            className="w-4/5 border rounded-xl shadow-lg bg-opacity-50 backdrop-blur-md relative mx-auto"
          >
            <img
              src={classItem.image}
              alt={classItem.name}
              className="w-full h-48 object-cover mb-2 rounded-t-xl shadow-lg"
            />

            <img
              className="h-32 rounded-full shadow-lg absolute top-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-[2px] "
              src={classItem.instructorImg}
              alt=""
            />

            <div className="flex flex-col -space-y-1 mt-16 text-center">
              <p className="text-white font-bold drop-shadow-lg">
                {classItem.instructorName}
              </p>
              <p className="text-xs text-slate-200">#Instructor</p>
            </div>
            <div className="flex  items-center justify-between mx-14 mt-6">
              <div className="text-center">
                <p className="text-white text-xl font-bold">12</p>
                <p className="text-slate-200 text-xs">Class Taken</p>
              </div>

              <div className="text-center">
                <p className="text-white text-xl font-bold">
                  {classItem.enrollCount}
                </p>
                <p className="text-slate-200 text-xs">Enrolled Students</p>
              </div>
            </div>

            <button className="glass w-full text-white font-semibold py-3 rounded-md hover:shadow-lg mt-5">
              View Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
