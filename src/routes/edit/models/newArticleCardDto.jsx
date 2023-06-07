import MaqromLogo from "../../../assets/MaqromLogo.png";

export default class NewArticleCardDto {
  constructor(article) {
    this.route = "articulo";
    this.title = "Titulo";
    this.content = "Carta creada desde el front";
    this.img = MaqromLogo;
    this.isLocked = false;
    this.article = article;
  }
}
