import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      dataUser: null,
      temas: null,
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
      temasList: async () => {
        fetch(process.env.REACT_APP_REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user,
            password: password,
            telefono: telefono,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.msg === "El usuario ya existe") {
              toast.error("El usuario ya existe");
            }
            actions.dataUserUpdate({
              id: data.id,
              telefono: data.telefono,
              user: data.user,
            });
            if (store.dataUser.id) {
              navigate("/comunity");
            }
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: data.id,
                telefono: data.telefono,
                user: data.user,
              })
            );
          })
          .catch((err) => console.log(err));
      },
    },
  };
};

export default getState;
