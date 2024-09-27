import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiSignup";
function useSignUp() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    mutationKey: ["user"],
    onSuccess: () => {
      console.log("user registered successfully");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { isLoading, signup };
}

export default useSignUp;
