import { useEffect, useState } from "react";

const PopularClasses = () => {
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
  console.log(classes);
  return (
    <div>
      <div className="mb-16 mt-28">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Popular Photography Classes for Every Skill Level
        </h1>
        <p className="  text-justify text-white">
          Discover our top 6 photography classes that cater to beginners and
          seasoned photographers alike. Explore the art of composition, master
          lighting techniques, and learn to capture stunning images in any
          setting. Join our community of photography enthusiasts and elevate
          your skills to new heights. Start your creative journey today!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {classes.slice(0, 6).map((classItem) => (
          <div
            key={classItem._id}
            className="p-2 border rounded-lg shadow-lg bg-opacity-50 backdrop-blur-md"
          >
            <img
              src={classItem.image}
              alt={classItem.name}
              className="w-full h-80 object-cover mb-2 rounded-lg"
            />
            <p className="font-bold text-xl text-white">{classItem.name}</p>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2 mt-4 -space-y-2 ">
                <img
                  className="h-9 rounded-md shadow-lg"
                  src={classItem.instructorImg}
                  alt=""
                />
                <div className="flex flex-col -space-y-1 ">
                  <p className="text-white font-bold drop-shadow-lg">
                    {classItem.instructorName}
                  </p>
                  <p className="text-xs text-slate-200 ">#Instructor</p>
                </div>
              </div>
              <p className="text-white text-xs ">
                {" "}
                <br /> {classItem.enrollCount} <br /> Students
              </p>
            </div>
            <div className="border-b border-gray-400 mt-6 mb-4 mx-1"></div>

            <button className=" glass w-full text-white font-semibold py-3 rounded-md hover:shadow-lg ">
              View Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
