

import CartaRenta from "../components/card-renta";
import Raccoon from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/raccoon.jpg" ;

export default function PubRenta() {
    return(

       
        <div>
                <CartaRenta onImage = { Raccoon } onTitle = "Hola" />
                <CartaRenta onImage = { Raccoon } onTitle = "Hola" />
                <CartaRenta onImage = { Raccoon } onTitle = "Hola" />
                <CartaRenta onImage = { Raccoon } onTitle = "Hola" />
                <CartaRenta onImage = { Raccoon } onTitle = "Hola" />
        </div>
           
      
    ) ;

}