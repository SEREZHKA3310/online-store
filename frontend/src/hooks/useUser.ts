import { useQuery, type QueryFunction } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
}

const fetchUser: QueryFunction<User> = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5173/api/me", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetchUser");
  }

  return response.json();
};

const useUser = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return data;
};

export default useUser;
