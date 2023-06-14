import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const imgHostingKey = import.meta.env.VITE_Imgbb_Key;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
  const [mongoDBSuccess, setMongoDBSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        console.log(imgRes);
        if (imgRes.success) {
          const imgURL = imgRes.data.display_url;
          const {
            name,
            price,
            instructorName,
            instructorEmail,
            availableSeats,
          } = data;
          const classes = {
            name,
            price: parseFloat(price),
            image: imgURL,
            instructorName,
            instructorEmail,
            availableSeats: parseInt(availableSeats),
          };

          axiosSecure
            .post("/classes", classes)
            .then((response) => {
              if (response.status === 200) {
                console.log(response);
                setMongoDBSuccess(true);
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Class Added",
                  text: "The class has been successfully added to the database.",
                });
              } else {
                // Handle the failure or show an error message
              }
            })
            .catch((error) => {
              console.log(error);
              // Handle the error or show an error message
            });
        }
      });
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Instructor Name*</span>
            </label>
            <input
              defaultValue={user?.displayName}
              readOnly
              type="text"
              {...register("instructorName", { required: true })}
              placeholder="Instructor Name"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">
                Instructor Email*
              </span>
            </label>
            <input
              defaultValue={user?.email}
              readOnly
              type="email"
              {...register("instructorEmail", { required: true })}
              placeholder="Instructor Email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Available Seats*</span>
            </label>
            <input
              type="number"
              {...register("availableSeats", { required: true })}
              placeholder="Available Seats"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Class Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>
        {mongoDBSuccess && (
          <div className="text-green-500 mt-4">
            Class added successfully to MongoDB.
          </div>
        )}
        <input className="btn btn-sm mt-4" type="submit" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClass;
