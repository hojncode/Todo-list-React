import {
  Link,
  Outlet,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { users } from "../db";

function User() {
  const { userIdGet } = useParams();
  console.log(userIdGet);
  console.log(useOutletContext());
  // const [readSearchParams, setSearchParams] = useSearchParams();
  // console.log(readSearchParams.get("users"));
  // setTimeout(() => {
  //   setSearchParams({ users: "haha" });
  // },1000);
  return (
    <div>
      <h1>userssss{userIdGet}</h1>
      <span>{users[Number(userIdGet - 1)].name}</span>
      <hr />
      <Link to="followers">followers..</Link>
      <Outlet
        context={{
          nameOfMyUser: users[Number(userIdGet - 1)].name,
        }}
      />
    </div>
  );
}

export default User;
