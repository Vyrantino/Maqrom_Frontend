export default class NewCardDto{
    constructor( route ){
        this.route = route ; 
        this.title = 'Titulo' ; 
        this.content = 'Carta creada desde el front' ;
        this.img = "http://localhost:3000/images/sommie.jpg"
        this.isLocked = false ; 
        this.article = 'pagina' ; 
    }
    

}