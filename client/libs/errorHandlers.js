import M from "materialize-css";

export const generalErrorHandler = () => {
  M.toast({html: 'Something went wrong!'});
};