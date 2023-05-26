import MaqromLogo from '../../../assets/MaqromLogo.png' ;

export default class NewCardDto{
    constructor( route ){
        this.route = route ; 
        this.title = 'Titulo' ; 
        this.content = 'Carta creada desde el front' ;
        this.img = MaqromLogo ;
        this.isLocked = false ; 
        this.article = 'pagina' ; 
    }

}