import * as React from "react";
import { Outlet } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import ButtonAppBar from "../components/navigation/appbar";
import Footer from "../components/navigation/footer";
import { Box } from "@mui/material";
import MaqromLogo from "../assets/Maqrom.svg";
import { useSelector } from "react-redux";
import Sidebar from "./edit/sidebar";

export default function Root() {
  const [sidebar, setSidebar] = React.useState(false);
  const route = useSelector( (state) => state.editForm.loadedRoute );
  const toogle = () => {
    setSidebar(!sidebar);
  };

  const mode = useSelector( (state) => state.adminMode.value);

  const handleNewCard = async () => {
    const card = new NewCardDto(route);
    await newCard(card, route).then(() => {
      getCards(setCards, route);
    });
  };

  const handleNewPaper = async () => {
    const paper = new NewPaperDto(route, "");
    await createNewPaper(paper, route, "").then(() => {
      getPapers(setPapers, route, "");
    });
  };

  return (
    <Box sx={{ padding: 0 }}>
      {mode && (
          <Sidebar
            sidebar={sidebar}
            toogle={toogle}
            handleNewCard={handleNewCard}
            handleNewPaper={handleNewPaper}
          />
      )}
      <ButtonAppBar toogle={toogle} />

      <Box className="ButtonAppBar">

        <Outlet context={[sidebar, setSidebar]} />
      </Box>

      <Footer />

      <FloatingWhatsApp
        notificationSound
        allowEsc
        allowClickAway
        avatar={MaqromLogo}
        chatMessage="Bienvenido a nuestra pagina! Escribanos un mensaje aqui para contactarnos por whatsapp"
        statusMessage="Recibirá una respuesta a lo largo de 72hrs!"
        phoneNumber="+526183613796"
        accountName="Maqrom Construcciones"
        chatboxHeight={'23em'}
      />
    </Box>
  );
}
