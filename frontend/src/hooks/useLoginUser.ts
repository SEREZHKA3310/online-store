import {
  useMutation,
  useQueryClient,
  type MutationFunction,
} from "@tanstack/react-query";

interface LoginUserResponse {
  token: string;
}

interface LoginUserParams {
  username: string;
  password: string;
}

const fetchLoginUser: MutationFunction<
  LoginUserResponse,
  LoginUserParams
> = async ({ username, password }) => {
  const response = await fetch("http://localhost:5173/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};

const useLoginUser = () => {
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchLoginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      client.refetchQueries({ queryKey: ["user"] });
    },
  });

  return mutate;
};

export default useLoginUser;
