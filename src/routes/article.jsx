import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import * as React from "react";
import { 
    createNewArticleCarouselItem, 
    deleteArticleCards, 
    deleteCarouselItem, 
    deleteImage, 
    getAllImages, 
    getArticleCards, 
    getArticleCarouselItems, 
    getArticles, 
    getGalleries, 
    getPaginatedImages, 
    newArticleCard, 
    patchCarousel, 
    uploadCompressedPhoto, 
    uploadPhoto 
} from "../axiosMain";
import { useDispatch, useSelector } from "react-redux";
import { loadRoute } from "../components/redux/editForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import Carousel from "../components/carousel";
import ListaImagenes from "./edit/listaImagenes";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import NewArticleCardDto from "./edit/models/newArticleCardDto";
import Carta from "../components/card";
import ArticlePicker from "./edit/articlePicker";
import MaqromLogo from "../assets/MaqromLogoPlantilla.png";
import Sidebar from "./edit/sidebar";
import Certificado from "../components/certificado";

export default function Article() {
  /*  */

  /* Redux */
  const mode = useSelector((state) => state.adminMode.value);
  const dispatch = useDispatch();
  /** States */
  /* Lista Imagenes */
  const [imageList, setImageList] = React.useState([]);
  const [galleries, setGalleries] = React.useState([]);
  const [gallery, setGallery] = React.useState("");
  const [image, setImage] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);

  /* Articulos */
  const [articleCards, setArticleCards] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [article, setArticle] = React.useState("");
  const loadedArticle = useSelector( ( state ) => state.editForm.loadedArticle ) ;
  /* CarouselItems */
  const [articleCarouselItems, setArticleCarouselItems] = React.useState([]);
  const [articleCarouselItem, setArticleCarouselItem] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState("");
  const [alt, setAlt] = React.useState();
  const [titulo, setTitulo] = React.useState();
  const [contenido, setContenido] = React.useState();
  /* Sidebar */
  const [sidebar, setSidebar] = useOutletContext();
  /* Constantes */

  const navigate = useNavigate();

  // Handlers

  const handlePage = (event, newPage) => {
    setPage(newPage);
    getPaginatedImages(setImageList, gallery, page, setPageCount);
  };
  const handleTitulo = (e) => setTitulo(e.target.value);
  const handleContenido = (e) => setContenido(e.target.value);

  const handleImagen = async (e) => {
    // ( file , alt , gallery , setImage , setImageList, page , setPageCount )
    const file = e.target.files[0];

    await uploadCompressedPhoto(
      file,
      alt,
      gallery,
      setImage,
      setImageList,
      page,
      setPageCount
    )
      .then( () => getPaginatedImages( setImageList , gallery , page , setPageCount )  ) ; 
  };

  const handleCreateNewCarouselItem = async (e) => {
    e.preventDefault();

    if (!article) {
      alert("Debe seleccionar un carousel primero");
    } else {
      const newCarouselItem = new NewArticleCardDto(article);
      await createNewArticleCarouselItem(newCarouselItem, article).then(() =>
        getArticleCarouselItems(setArticleCarouselItems, article)
      );
    }
  };

  const handleDeleteCarouselItem = async (e) => {
    e.preventDefault();
    await deleteCarouselItem(articleCarouselItem).then(() => {
      getArticleCarouselItems(setArticleCarouselItems, article);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await patchCarousel(
      articleCarouselItem,
      titulo,
      contenido,
      !image ? articleCarouselItem.img : image
    ).then(() => getArticleCarouselItems(setArticleCarouselItems, article));
  };

  const handleDelete = async (idCard) => {
    await deleteArticleCards(idCard).then(() =>
      getArticleCards(setArticleCards, article)
    );
  };

  const handleNewArticleCard = async () => {
    const card = new NewArticleCardDto(article);
    await newArticleCard(card, article).then(() =>
      getArticleCards(setArticleCards, article)
    );
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    const partirImage = image.split("/");
    const nombreImage = partirImage[partirImage.length - 1];
    await deleteImage(nombreImage);
    setAlt("");
    setImage("");
    getPaginatedImages(setImageList, gallery, page, setPageCount);
  };

  /* Para abrir la sidebar */
  const toogle = (open) => {
    setSidebar(open);
  };

  React.useEffect(() => {
    //getArticles( setArticles ) ;
    setSidebar(false);
    setArticle( loadedArticle ) ;
  }, []);

  React.useEffect(() => {
    getArticleCarouselItems(setArticleCarouselItems, article);
    getArticles(setArticles);
  }, [article]);

  React.useEffect(() => {
    getPaginatedImages(
      setImageList,
      gallery === "Todas las imagenes" ? "" : gallery,
      page,
      setPageCount
    );
  }, [page, gallery]);

  React.useEffect(() => {
    getArticleCards(setArticleCards, article);
  }, [article]);

  React.useEffect(() => {
    getAllImages(setImageList, gallery === "Todas las imagenes" ? "" : gallery);
    getGalleries(setGalleries);
  }, [gallery]);

  return (
    <Box className="editCardForm">
      <Sidebar
        sidebar={sidebar}
        toogle={toogle}
        handleNewCard={handleNewArticleCard}
      />
      {mode ? (
        <ArticlePicker
          className="ArticlePicker"
          setArticle={setArticle}
          articles={articles}
          article={article}
        />
      ) : (
        <span />
      )}

      <Carousel
        article={article}
        setCarouselItem={setArticleCarouselItem}
        currentImage={setCurrentImage}
        carouselItems={articleCarouselItems}
        index={index}
      />
      {mode ? (
      <Box> 
          <ButtonGroup
            sx={{
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              color ="success"
              endIcon={<AddAPhotoIcon />}
              onClick={handleCreateNewCarouselItem}
            >
              Agregar una foto predeterminada al carousel
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteCarouselItem}
              endIcon={<DeleteIcon />}
            >
              Borrar el elemento seleccionado
            </Button>
            
          </ButtonGroup>
          <Box
            component="form"
            display={'flex'}
            flexDirection={'column'}
            onSubmit={handleSubmit}
            padding={2}
            flex={1}
            alignItems={'center'}
          >
            <TextField
              sx={{ width: '70%' }}
              className="editCardFormTextField"
              id="filled-basic"
              label="Titulo"
              multiline
              onChange={handleTitulo}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={{ width: '70%' }}
              id="filled-multiline-static"
              label="Contenido"
              multiline
              rows={2}
              variant="filled"
              onChange={handleContenido}
              InputLabelProps={{ shrink: true }}
            />
           
          </Box>{/* Box de Formulario */}

         
          <Box
            display={'flex'}
            justifyContent={'center'}
          >
            <ListaImagenes
              setImageList={setImageList}
              setGallery={setGallery}
              setImage={setImage}
              height={450}
              width={500}
              gallery={gallery}
              galleries={galleries}
              imageList={imageList}
              pageCount={pageCount}
              page={page}
              handlePage={handlePage}
            />
              <Box sx={{ display: "flex", flexDirection: "column" , alignSelf: 'center', justifySelf: 'center' , padding: '1em' }}>
                    
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  endIcon={<PublishIcon />}
                >
                  Aplicar Cambios
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  endIcon={<AddAPhotoIcon />}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImagen}
                  />
                  Subir una Imagen
                </Button>
                <img
                  width={"500"}
                  height={"450"}
                  src={!image ? MaqromLogo : image}
                />

                

                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    alignSelf: "center",
                    margin: '1em'
                  }}
                  onClick={handleDeleteImage}
                >
                  Borrar Esta Imagen
                  <DeleteIcon />
                </Button>
              </Box>
          </Box>{" "}
          {/* Box de galerias */}
          {/* Box Principal */}
        </Box>
      ) : (
        <span />
      )}

      <Container>
        {articleCards.map((item) =>
          item.route != "articulo" ? (
            <span key={item.idCard} />
          ) : (
           <Certificado  
              key={item.idCard}
              img={item.img}
              title={item.title}
              content={item.content}
              route={item.route}
              idCard={item.idCard}
              isLocked={item.isLocked}
              handleDelete={handleDelete}
              buttons = { mode }
            />
          )
        )}
      </Container>
    </Box>
  );
}
