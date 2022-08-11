import Axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneToCart, cleanDetails, getDetails } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar2 from "../Navbar2/Navbar2";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "90%",
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductDetail({ id }) {
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [valueNew, setNewValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openSnack, setSnack] = useState(false);
  console.log(reviews, "SOY LAS REVIEWS");
  const classes = useStyles();
  const navigate = useNavigate()
  const myShoes = useSelector((state) => state.detail);
  const userLogged = useSelector((state) => state.user);
  console.log(userLogged, "USER");
  const labels = {
    1: "Malo",
    2: "Regular",
    3: "Satisfactorio",
    4: "Bueno",
    5: "Excelente",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(id));
    getReviews();
    return()=>{
      dispatch(cleanDetails())
    }
  }, [dispatch, id]);

  const getReviews = () => {
    fetch(`http://localhost:3001/reviews/${myShoes.id}`)
      .then((data) => data.json())
      .then((allReviews) => setReviews(allReviews))
      .catch((err) => console.log(err));
  };
  // const user = useSelector((state) => state.user);
  const cartProducts = useSelector((state) => state.cart);

  let cantidad = 1;
  console.log(myShoes, "soy my shoes");
  const [size, setSize] = useState([]);
  const shoesAdd = {
    id: id,
    size: size.map((e) => parseInt(e)),
    quantity: size.length,
  };
  console.log(shoesAdd, "shoesAdd");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleToast = () => {
    toast.error("Debes estar logueado para poder comprar", {
      className: "buy-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
      toastId: "prevent-buy-toast",
    });
  };
  const handleSnack = () => {
    setSnack(false);
  };
  const addLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  };

  const saveLocalStorage = () => {
    localStorage.getItem("products");
  };

  //  const addToCartToast = () => {

  // }
  const handleOnChangeSize = (e) => {
    e.preventDefault();
    setSize(size.concat(e.target.value));
  };
  const handleDeleteSizes = (e, el) => {
    e.preventDefault();
    setSize(size.filter((en) => en !== el));
  };
  console.log(size);
  useEffect(() => {
    if (cartProducts && cartProducts.length) {
      addLocalStorage();
      saveLocalStorage();
    }
  }, [cartProducts]);

  const handleCloseDelete = () => {
    setOpen(false);
    handleAddReview(myShoes.id, userLogged.id);
  };
  const handleAddReview = (productId, userId) => {
    Axios.post(`http://localhost:3001/reviews/${productId}/add`, {
      userId: userId,
      rating: valueNew,
      description: description,
    })
      .then((data) => {
        getReviews();
        setSnack(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (cartProducts && cartProducts.length) {
      addLocalStorage();
      saveLocalStorage();
    }
  }, [cartProducts]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const addToCart = () => {
    if(size.length === 0){
      toast.error("Debes elegir al menos 1 talle!", {
        className: "cart-toast",
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      })
    }else{
      dispatch(addOneToCart(shoesAdd));
      toast.success("Tu producto fue agregado al carrito!", {
        className: "cart-toast",
        draggable: true,
        position: toast.POSITION.TOP_CENTER,
      });
      setSize([]);
    }
  };
  const addToCart1 = () => {
    dispatch(addOneToCart(shoesAdd));
    toast.success("Tu producto fue agregado al carrito!", {
      className: "cart-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
    setSize([])
  };

  const handleComprar = () => {
    addToCart()
    if(size.length !== 0){
      navigate('/mercadopago/pagos')
    }
  }

  return (
    <div>
      {myShoes ? (
        <div className={styles.divCard}>
          <img
            src={myShoes.image}
            alt="imgShoes not found"
            className={styles.imagen}
          />
          <div className={styles.divContent}>
            <h1 className={styles.title}>{myShoes.title}</h1>
            <div className={styles.sizePriceCont}>
              <div className={styles.sizeContainer}>
                <div className={styles.sizeYSelect}>
                <div className={styles.tallesContainer}>
                <div className={styles.talleDetails}>
                <h1 className={styles.size}>Talle: </h1>
                <select
                  className={styles.selectSize}
                  onChange={(e) => {
                    handleOnChangeSize(e);
                  }}
                >
                  <option></option>
                  {myShoes.sizes &&
                    myShoes.sizes.map((s, i) => (
                      <option key={i} value={s.number}>
                        {s.number}
                      </option>
                    ))}
                </select>
                {size.length ?
                  size.map((sn, i) => (
                    <span
                      className={styles.selectedSize}
                      key={i}
                      onClick={(e) => {
                        handleDeleteSizes(e, sn);
                      }}
                    >
                      {sn}
                    </span>
                  )) : null}
                  </div>
                  <div className={styles.cantYPrecio}>
                <h4>
                  Cantidad: {size.length}
                </h4>
                <h3 className={styles.price}>${myShoes.price}</h3>
                </div>
                </div>
              </div>        
              </div>
            </div>
            <div className={styles.buttons}>
              {!Object.keys(userLogged).length ? (
                <button onClick={handleToast} className={styles.cart}>
                  Comprar
                </button>
              ) : (
               
                  <button
                    className={styles.cart}
                    onClick={handleComprar}
                    id={myShoes.id}
                  >
                    Comprar
                  </button>
              
              )}
              <button
                className={styles.cart}
                onClick={addToCart}
                id={myShoes.id}
              >
                Añadir al carro
              </button>{" "}
            </div>
          </div>

          <Fragment>
            <div className={styles.reviewContainer}>
              {userLogged.id && (
                <div className={styles.inputReviewDiv}>
                  <p>
                    ¿Has comprado este producto? ¡Comparte tu opinión con el
                    resto!
                  </p>
                  <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={() => console.log("holaaaaa")}
                  >
                    <TextField
                      required
                      id="outlined-basic"
                      label="Escribe tu reseña"
                      variant="outlined"
                      onChange={handleDescriptionChange}
                      value={description}
                      color= "white"
                    />
                  </form>
                  <Rating
                    name="hover-feedback"
                    value={valueNew}
                    precision={1}
                    onChange={(event, newValue) => {
                      setNewValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {valueNew !== null && (
                    <Box ml={0} style={{ marginBottom: "10px" }}>
                      {labels[hover !== -1 ? hover : valueNew]}
                    </Box>
                  )}
                  <Button
                    variant="contained"
                    color="#fd7e14"
                    style={{ width: "200px" }}
                    className={styles.addReview}
                    onClick={handleClickOpen}
                  >
                    AÑADIR RESEÑA
                  </Button>
                </div>
              )}

              <h3 className={styles.reviewTittle}>
                Mira las críticas de {myShoes.title}{" "}
              </h3>
              {reviews.length > 0 ? (
                reviews.map((e) => (
                  <div className={styles.reviewCard}>
                    <div className={styles.reviewRating}>
                      <Box
                        component="fieldset"
                        mb={1}
                        borderColor="transparent"
                      >
                        <Typography component="legend">Valoracion: </Typography>
                        <Rating name="read-only" value={e.value} readOnly />
                        <p style={{ alignSelf: "flex-start" }}>
                          {" "}
                          <Chip
                            variant="outlined"
                            color="primary"
                            label={`Autor: ${e.author.name} (Usuario ID: #${e.author.id}) `}
                            className={styles.chip}
                            title={e.description}
                          />{" "}
                        </p>
                      </Box>
                    </div>
                    <div className={styles.reviewContent}>
                      <span>{e.review}</span>
                    </div>
                  </div>
                ))
              ) : (
                <h5>No se encontraron reseñas para este producto.</h5>
              )}
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"¿Estas seguro de añadir reseña?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ textAlign: "center", paddingBottom: "5px" }}
                >
                  Esta acción puede ser modificada en tu panel de usuario.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
                  style={{
                    maxWidth: "25%",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCloseDelete}
                  color="primary"
                  autoFocus
                  style={{
                    maxWidth: "25%",
                    color: "black",
                    backgroundColor: "#ffff01",
                  }}
                >
                  Continuar
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleSnack}
            >
              <Alert
                onClose={handleSnack}
                severity="success"
                style={{ backgroundColor: "#3f51b5", color: "white" }}
              >
                La reseña fue añadida con exito
              </Alert>
            </Snackbar>
          </Fragment>
        </div>
      ) : (
        <div>
          <img
            src="https://i.pinimg.com/originals/76/59/35/7659353c8fcde74a4c224dafd7a5eccf.gif"
            alt="Shoes"
          />
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}
