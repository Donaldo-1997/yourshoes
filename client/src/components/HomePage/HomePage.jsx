import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllShoes,
  getAllBrands,
  filterByBrand,
  filterByPrice,
  getAllCategories,
  combinationsFilter,
  filterByCategory,
  filterBySize,
  combinationsFilter6,
  combinationsFilter4,
  combinationsFilter8,
  combinationsFilter11,
  combinationsFilter_12,
  combinationsFilter_13,
  getShoesName,
  combinationsFilter1,
  combinationsFilter3,
  combinationsFilter2
} from "../../redux/actions";
import ProductCards from "../ProductCards/ProductCards";
import Pagination from "../Pagination/Pagination";
import Banner from "../Banner/Banner";
import NavBar from "../NavBar/NavBar";
import About from "../About/Footer";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  const [brandFilter, setBrandFilter] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [sizeFilter, setSizeFilter] = useState("default");
  const [nameFilter, setNamerFilter] = useState("")
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("")

  //Paginado//
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage] = useState(12);
  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes =
    Array.isArray(allProducts) &&
    allProducts.slice(indexOfFirstShoe, indexOfLastShoe);

  const pagination = (page) => {
    setCurrentPage(page);
  };

  const nextPageButton = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPageButton = () => {
    setCurrentPage(currentPage - 1);
  };
  //Paginado//

  const handleInputPriceMin = (e) => {
    setPriceMin(e.target.value)
  }

  const handleInputPriceMax = (e) => {
    setPriceMax(e.target.value)
  }
  const handleInputName = (e) => {
    e.preventDefault();
    setNamerFilter(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if(priceMax !== "" && priceMin !== "" && brandFilter !== ""){
      dispatch(combinationsFilter2(brandFilter, priceMin, priceMax, nameFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter1(nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default"){
      dispatch(combinationsFilter3(nameFilter, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (!nameFilter) {
      alert("Put a Name");
    } else {
      dispatch(getShoesName(nameFilter));
    }
    setCurrentPage(1)
  };

  const handleFilterBrand = (e) => {
    setBrandFilter(e.target.value);
    if(priceMin !== "" && priceMax !== "" && sizeFilter !== "default"){
      dispatch(combinationsFilter11(e.target.value, priceMin, priceMax, sizeFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMax !== "" && priceMin !== "" && nameFilter !== ""){
      dispatch(combinationsFilter2(e.target.value, priceMin, priceMax, nameFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== ""){
      dispatch(combinationsFilter3(nameFilter, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (priceMin !== "" && priceMax !== "") {
      dispatch(combinationsFilter(e.target.value, priceMin, priceMax))
        .then(res => console.log(res.data))
        .catch(err => alert(err.response.data))
    }
    else if(sizeFilter !== "default"){
      dispatch(combinationsFilter_13(sizeFilter, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterByBrand(e.target.value));
    }
    setCategoryFilter("default")
    setCurrentPage(1);
  };

  const handleCategories = (e) => {
    setCategoryFilter(e.target.value);
    if (priceMin !== "" && priceMax !== "") {
      dispatch(combinationsFilter4(e.target.value, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterByCategory(e.target.value))
    }
    setBrandFilter("default")
    setCurrentPage(1);
  }

  const handleFilterByPrice = (e) => {
    e.preventDefault()
    if (brandFilter !== "default" && sizeFilter !== "default") {
      dispatch(combinationsFilter11( brandFilter, priceMin, priceMax, sizeFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    if (brandFilter !== "default" && nameFilter !== "default") {
      dispatch(combinationsFilter2( brandFilter, priceMin, priceMax, nameFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(nameFilter !==""){
      dispatch(combinationsFilter1(nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (brandFilter !== "default") {
      dispatch(combinationsFilter(brandFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if (categoryFilter !== "default" ) {
      dispatch(combinationsFilter4(categoryFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if (sizeFilter !== "default" && priceMin !=="" && priceMax !=="") {
      dispatch(combinationsFilter_12(sizeFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterByPrice(priceMin, priceMax))
    }
    setCurrentPage(1)
  }

  const handleSize = (e) => {
    setSizeFilter(e.target.value)
    if(priceMin !== "" && priceMax !== "" && brandFilter !== "default"){
      dispatch(combinationsFilter11(brandFilter, priceMin, priceMax, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (priceMax !== "" && priceMin !== ""&& sizeFilter!=="default") {
      dispatch(combinationsFilter_12(e.target.value, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default"){
      dispatch(combinationsFilter_13(e.target.value, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterBySize(e.target.value))
      setSizeFilter(e.target.value)
    }
    setCurrentPage(1);
  }


  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getAllShoes());
    setBrandFilter("default");
    setCategoryFilter("default");
    setSizeFilter("default")
    setPriceMax("")
    setPriceMin("")
    setNamerFilter("")
  };

  useEffect(() => {
    dispatch(getAllShoes());
    dispatch(getAllBrands());
    dispatch(getAllCategories())
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <NavBar
        handleNameSubmit={handleNameSubmit}
        handleInputName={handleInputName}
        handleReset={handleReset}
      ></NavBar>
      <Banner></Banner>
      <div className={styles.filtersContainer}>
        <select onChange={(e) => handleFilterBrand(e)} value={brandFilter} className={styles.brandSelect}>
          <option value={"default"} disabled>Marcas</option>
          <option value="Vans">Vans</option>
          <option value="Converse">Converse</option>
          <option value="Crocs">Crocs</option>
          <option value="Nike">Nike</option>
          <option value="Vizzano">Vizzano</option>
          <option value="adidas">Adidas</option>
          <option value="Caterpillar">Caterpillar</option>
          <option value="Moleca">Moleca</option>
          <option value="Faraon">Faraon</option>
          <option value="Briganti">Briganti</option>
        </select>
        <select onChange={(e) => handleCategories(e)} value={categoryFilter} className={styles.brandSelect}>
          <option value={"default"} disabled>Categorías</option>
          <option value="Zapatillas">Zapatillas</option>
          <option value="Botas y Botinetas">Botas y Botinetas</option>
          <option value="Sandalias y Ojotas">Sandalias y Ojotas</option>
          <option value="Stilletos y Plataformas">Stilletos y Plataformas</option>
          <option value="Mocasines y Oxfords">Mocasines y Oxfords</option>
          <option value="Pantuflas">Pantuflas</option>
          <option value="Chatitas">Chatitas</option>
          <option value="Alpargatas">Alpargatas</option>
        </select>
        <select onChange={(e) => handleSize(e)} value={sizeFilter} className={styles.brandSelect}>
          <option value={"default"} disabled>Talles</option>
          <option value={35}>35</option>
          <option value={36}>36</option>
          <option value={37}>37</option>
          <option value={38}>38</option>
          <option value={39}>39</option>
          <option value={40}>40</option>
          <option value={41}>41</option>
          <option value={42}>42</option>
          <option value={43}>43</option>
          <option value={44}>44</option>
          <option value={45}>45</option>
        </select>
        <form onSubmit={handleFilterByPrice}>
          <input value={priceMin} type="search" onChange={(e) => handleInputPriceMin(e)} placeholder="Precio min." className={styles.priceFilter} />
          <input value={priceMax} type="search" onChange={(e) => handleInputPriceMax(e)} placeholder="Precio max." className={styles.priceFilter} />
          <button type="submit" className={styles.priceButton}>➤</button>
        </form>
      </div>
      <Pagination
        shoesPerPage={shoesPerPage}
        allProducts={allProducts.length}
        pagination={pagination}
        nextPageButton={nextPageButton}
        prevPageButton={prevPageButton}
        currentPage={currentPage}
      />
      <div className={styles.cardContainer}>
        <div>
          {currentShoes ? (
            <ProductCards allProducts={currentShoes} />
          ) : (
            <ProductCards allProducts={allProducts} />
          )}
        </div>
        <Pagination
          shoesPerPage={shoesPerPage}
          allProducts={allProducts.length}
          pagination={pagination}
          nextPageButton={nextPageButton}
          prevPageButton={prevPageButton}
          currentPage={currentPage}
        />
        <div>
          <About />
        </div>
      </div>
    </div>
  );
}
