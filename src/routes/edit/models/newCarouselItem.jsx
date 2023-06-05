
import MaqromLogo from '../../../assets/MaqromLogo.png' ;

export default class NewCarouselItemDto{
    constructor( route ){
        this.route = route ; 
        this.title = 'Titulo' ; 
        this.content = 'Carousel Item creado desde el front' ;
        this.img = MaqromLogo ; 
        this.article = 'pagina'
    }
    

}