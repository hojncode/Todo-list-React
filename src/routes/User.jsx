import { useParams } from "react-router-dom";

function User() {
  const { userIdGet } = useParams();
  console.log(userIdGet);
  return <h1>userssss{userIdGet}</h1>;
}

export default User;
