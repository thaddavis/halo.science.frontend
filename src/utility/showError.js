import { toast } from "react-toastify";

export function showError(error) {
  let message = "An error occurred";
  switch (error.code) {
    case "ERR_BAD_RESPONSE":
      message = `The request caused an error`;
      break;
    default:
      break;
  }

  toast.error(message);
}
