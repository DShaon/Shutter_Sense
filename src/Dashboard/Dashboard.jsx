import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  // TODO
  const userRole = "admin";

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content">
            {/* Sidebar content here */}

            {userRole === "student" && (
              <>
                <li>
                  <a>Student</a>
                </li>
                <li>
                  <a>Payment</a>
                </li>
                <li>
                  <a>My Selected Classes</a>
                </li>
                <li>
                  <a>My Enrolled Classes</a>
                </li>
              </>
            )}
            {userRole === "teacher" && (
              <>
                <li>
                  <a>Teacher</a>
                </li>
                <li>
                  <a>Add Class</a>
                </li>
                <li>
                  <a>My Classes</a>
                </li>
              </>
            )}
            {userRole === "admin" && (
              <>
                <li>
                  <a>Admin</a>
                </li>
                <li>
                  <a>Manage Classes</a>
                </li>
                <li>
                  <Link to="/dashboard/users"> Manage User</Link>
                </li>
              </>
            )}
            <div className="divider"></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
