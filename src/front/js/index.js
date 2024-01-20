// Importar React y createRoot
import React from "react";
import { createRoot } from "react-dom/client";

// Importar tus propios componentes
import Layout from "./layout";

// Crear una raíz y renderizar tu aplicación React
const root = createRoot(document.querySelector("#app"));
root.render(<Layout />);
