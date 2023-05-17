export default class NewArticleCardDto{
    constructor( article ){
        this.route = 'articulo' ; 
        this.title = 'Titulo' ; 
        this.content = 'Carta creada desde el front' ;
        this.img = "http://localhost:3000/images/sommie.jpg"
        this.isLocked = false ; 
        this.article = article ; 
    }
    

}