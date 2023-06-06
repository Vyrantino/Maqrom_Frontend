import * as React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import {
  deleteImage,
  getAllImages,
  getArticles,
  getPaper,
  getGalleries,
  uploadPhoto,
  patchPaper,
  getPaginatedImages,
} from "../../axiosMain";

import { useNavigate, useParams } from "react-router-dom";
import Admin from "../../admin";
import ListaImagenes from "./listaImagenes";
import MaqromLogo from "../../assets/MaqromLogoPlantilla.png";
import imageCompression from "browser-image-compression";

export default function EditPaper() {
  const paperId = useParams();
  /* Lista Imagenes */
  const [imageList, setImageList] = React.useState([]);
  const [galleries, setGalleries] = React.useState([]);
  const [gallery, setGallery] = React.useState("");
  const [image, setImage] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);

  const mode = useSelector((state) => state.adminMode.value);
  const [paper, setPaper] = useState([]);
  const [titulo, setTitulo] = useState();
  const [contenido, setContenido] = useState();
  const [alt, setAlt] = useState();
  const [article, setArticle] = useState("");
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  /* Handlers */

  const handlePage = (event, newPage) => {
    setPage(newPage);
    getPaginatedImages(setImageList, gallery, page, setPageCount);
  };

  const handleTitulo = (e) => setTitulo(e.target.value);
  const handleContenido = (e) => setContenido(e.target.value);
  const handleAlt = (e) => setAlt(e.target.value);

  const handleImagen = async (e) => {
    // ( file , alt , gallery , setImage , setImageList, page , setPageCount )
    const file = e.target.files[0];

    uploadCompressedPhoto(
      file,
      alt,
      gallery,
      setImage,
      setImageList,
      page,
      setPageCount
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    patchPaper(
      paper.idCard,
      titulo,
      contenido,
      !image ? paper.img : image,
      article ? article : "pagina"
    );
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    const partirImage = image.split("/");
    const nombreImage = partirImage[partirImage.length - 1];
    await deleteImage(nombreImage);
    setAlt("");
    setImage("");
    getAllImages(setImageList, gallery === "Todas las imagenes" ? "" : gallery);
  };

  const handleChangeArticle = (e) => {
    const articleValue = e.target.value;
    e.preventDefault();
    setArticle(articleValue === "Sin Articulo" ? "" : articleValue);
  };

  React.useEffect(() => {
    getPaper(setPaper, paperId);
    getArticles(setArticles);
  }, []);

  React.useEffect(() => {
    getPaginatedImages(
      setImageList,
      gallery === "Todas las imagenes" ? "" : gallery,
      page,
      setPageCount
    );
  }, [page, gallery]);

  React.useEffect(() => {
    getGalleries(setGalleries);
    getAllImages(setImageList, gallery === "Todas las imagenes" ? "" : gallery);
  }, [gallery]);

  if (!mode) {
    return <Admin />;
  } else
    return (
      <Box component="form" className="editCardForm" onSubmit={handleSubmit}>
        <Typography variant="h1" gutterBottom sx={{ alignSelf: "center" }}>
          {`Esta carta actualmente redirige a ${paper.article} ${paper.route}`}
        </Typography>
        <Typography variant="h1" gutterBottom sx={{ alignSelf: "center" }}>
          {" "}
          {paper.idpaper}{" "}
        </Typography>
        <FormControl variant="filled" sx={{ m: 1, minWidth: "60%" }}>
          <InputLabel id="demo-simple-select-filled-label">
            {" "}
            Articulos dados de alta{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={article}
            onChange={handleChangeArticle}
            defaultValue=""
          >
            <MenuItem key="blank" value={"Sin Articulo"}>
              {" "}
              Sin Articulo{" "}
            </MenuItem>
            {articles.map((item) => (
              <MenuItem key={item.idArticle} value={item.articleName}>
                {" "}
                {item.articleName}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoFocus
          className="editCardFormTextField"
          id="filled-basic"
          defaultValue={paper.title}
          label="Titulo"
          multiline
          inputProps={{ maxLength: 50 }}
          onChange={handleTitulo}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="filled-multiline-static"
          label="Contenido"
          multiline
          inputProps={{ maxLength: 255 }}
          variant="filled"
          onChange={handleContenido}
          defaultValue={paper.content}
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ListaImagenes
            setImageList={setImageList}
            setGallery={setGallery}
            setImage={setImage}
            height={450}
            width={500}
            gallery={gallery}
            galleries={galleries}
            imageList={imageList}
          />
          <img width={"500"} height={"450"} src={!image ? MaqromLogo : image} />
          <img
            width={"500"}
            height={"450"}
            src={!paper.img ? MaqromLogo : paper.img}
          />
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            color="primary"
            page={page}
            onChange={handlePage}
          />
        </Stack>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" onChange={handleImagen} />
          <AddAPhotoIcon />
        </IconButton>
        <IconButton
          aria-label="Example"
          sx={{
            width: "20%",
            alignSelf: "center",
          }}
          type="submit"
          onClick={() => {
            navigate(-1);
          }}
        >
          <PublishIcon />
        </IconButton>

        <TextField
          className="editCardFormTextField"
          id="filled-basic"
          label="Breve descripcion de la imagen"
          onChange={handleAlt}
        />

        <IconButton
          aria-label="Example"
          sx={{
            width: "20%",
            alignSelf: "center",
          }}
          onClick={handleDeleteImage}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Box>
    );
}
