import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      dataUser: null,
      temas: false,
      temaEdit: false,
      modalEdit: false,
      filterTema: false,
      comentsAll: false,
      comentsEdit: "",
    },
    actions: {
      // Use getActions to call a function within a fuction

      dataUserUpdate: (newMessage) => {
        setStore({ dataUser: newMessage });
      },
      loguot: () => {
        localStorage.removeItem("user");
        setStore({ dataUser: null });
        setStore({ temas: false });
        setStore({ comentsAll: false });
        toast.info("Se cierra sesión con exito");
      },
      temasList: async () => {
        fetch(process.env.REACT_APP_LIST_TEMAS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({ temas: data });
          })
          .catch((err) => console.log(err));
      },
      modalTrue: async () => {
        setStore({ modalEdit: true });
      },
      modalFalse: async () => {
        setStore({ modalEdit: false });
      },
      temaEdit: async (dataEdit) => {
        setStore({ temaEdit: dataEdit });
        setStore({ modalEdit: true });
      },

      temaEditFalse: async () => {
        setStore({ temaEdit: false });
      },
      deleteTema: async (idTema, idUser) => {
        await fetch(`${process.env.REACT_APP_DELETE_TEMA}${idTema}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: idUser,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            toast.success("Tema Eliminado satisfactoriamente");
          })
          .catch((err) => console.log(err));
      },

      modificatedFilterTema: async (cambio) => {
        setStore({ filterTema: cambio });
      },

      comentsAlls: async () => {
        fetch(process.env.REACT_APP_LIST_COMENTS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({ comentsAll: data });
          })
          .catch((err) => console.log(err));
      },

      comentEdit: async (dataEdit) => {
        setStore({ comentsEdit: dataEdit });
      },
      resetComentEdit: async () => {
        setStore({ comentsEdit: "" });
      },

      resetTemas: async () => {
        setStore({ temas: false });
      },

      resetComents: async () => {
        setStore({ comentsAll: false });
      },
    },
  };
};

export default getState;
