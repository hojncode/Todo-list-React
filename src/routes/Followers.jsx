import { useOutletContext } from "react-router-dom";

function Followers() {
    const {nameOfMyUser} = useOutletContext()
    console.log(nameOfMyUser)
    return <h1>'{nameOfMyUser}' Followers</h1>;
}

export default Followers;
