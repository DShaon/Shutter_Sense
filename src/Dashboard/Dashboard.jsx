import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  const [isAdmin ] = useAdmin();
  const [isTeacher ] = useTeacher();
  const [isStudent ] = useStudent();

  console.log(isStudent)

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
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content">
            {/* Sidebar content here */}

            {isTeacher ? (
              <>
                <li>
                  <a>Teacher</a>
                </li>
                <li>
                  <Link to="/dashboard/addclass">Add A Class</Link>
                </li>
                <li>
                  <Link to="/dashboard/myclass">My Classes</Link>
                </li>
              </>
            ) : isAdmin ? (
              <>
                <li>
                  <a>Admin</a>
                </li>
                <li>
                  <Link to="/dashboard/manageclass">Manage Classes</Link>
                </li>
                <li>
                  <Link to="/dashboard/users">Manage User</Link>
                </li>
              </>
            ) : isStudent ? (
              <>
                <li>
                  <a>Student</a>
                </li>
                <li>
                  <Link to="/dashboard/payment">Payment</Link>
                </li>
                <li>
                  <Link to="/dashboard/selectedclasses">My Selected Classes</Link>
                </li>
                <li>
                  <Link to="/dashboard/enrolledclasses">My Enrolled Classes</Link>
                </li>
              </>
            ) : null}

            <div className="divider"></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
