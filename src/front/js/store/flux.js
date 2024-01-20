import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      dataUser: null,
    },
    actions: {
      // Use getActions to call a function within a fuction

      dataUserUpdate: (newMessage) => {
        setStore({ dataUser: newMessage });
      },
      loguot: () => {
        localStorage.removeItem("user");
        setStore({ dataUser: null });
        toast.info("Se cierra sesión con exito");
      },
    },
  };
};

export default getState;
