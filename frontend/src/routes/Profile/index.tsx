import { Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const data = useUser();

  return <div>{data?.username}</div>;
};

export default Profile;
