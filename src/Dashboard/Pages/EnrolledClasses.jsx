import useEnrolledClass from "../../hooks/useEnrolledClass";

const EnrolledClasses = () => {
  const { enrolledClass } = useEnrolledClass();
  return (
    <div>
      <h1>Enrolled class {enrolledClass.length}</h1>
    </div>
  );
};

export default EnrolledClasses;
