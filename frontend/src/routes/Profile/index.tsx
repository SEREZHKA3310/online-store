import { Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const data = useUser();
  if (!data) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      {data.id}
      {data?.username}
    </div>
  );
};

export default Profile;
