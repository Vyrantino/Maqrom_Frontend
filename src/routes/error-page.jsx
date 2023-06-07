import { Link, useRouteError } from "react-router-dom";
import { Button } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Lo sentimos, un Error inesperado ha ocurrido.</p>
      <Button LinkComponent={Link} to="/">
        Regresar a <br /> página principal
      </Button>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
