import MaqromLogo from '../../../assets/MaqromLogo.png' ;


export default class NewArticleCarouselItem{
    constructor( article ){
        this.route = 'articulo' ; 
        this.title = 'Titulo' ; 
        this.content = 'Carousel Item creado desde el front' ;
        this.img = MaqromLogo ;
        this.article = article  ;
    }
    

}