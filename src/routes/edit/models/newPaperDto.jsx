import MaqromLogo from '../../../assets/MaqromLogo.png' ;

export default class NewPaperDto{
    constructor( route , article ){

        this.title = 'Titulo' ; 
        this.content = 'Carta creada desde el front' ;
        this.img = MaqromLogo ;
        this.article = article ? article : 'pagina' ; 
        this.link = 'nolink' ; 
        this.route = route ? route : 'article' ; 
    }

}