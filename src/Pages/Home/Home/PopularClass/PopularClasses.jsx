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
      <h1 className="text-2xl font-bold mb-4">Popular Classes</h1>
      <div className="grid grid-cols-3 gap-4">
        {classes.slice(0, 6).map((classItem) => (
          // Render the class item
          // ...
          <div key={classItem._id}>
            <div className="border">
              <p className="text-2xl text-white">{classItem.enrollCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
