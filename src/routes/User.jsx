import { Link, Outlet, useParams } from "react-router-dom";

function User() {
  const { userIdGet } = useParams();
  console.log(userIdGet);
  return (
    <div>
      <h1>userssss{userIdGet}</h1>
      <hr />
      <Link to="followers">followers..</Link>
      <Outlet />
    </div>
  );
}

export default User;
