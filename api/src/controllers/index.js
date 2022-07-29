const { Product, Category, Brand, Size } = require("../db");
const axios = require("axios");
const {Op} = require ("sequelize");

const getDb = async () => {
  const foundDate = await Product.findAll({ include: { model: Category, attributes: ["id", "name"], throught: { attributes: [] } } });
  return foundDate;
};
let sizeStock = [{id: 1, number:35, stock:5, counter:0},{id: 2,number:36, stock:5, counter:0},{id: 3, number:37, stock:5, counter:0},{id: 4, number:38, stock:5, counter:0},{id: 5, number:39, stock:5, counter:0},{id: 6, number:40, stock:5, counter:0},{id: 7, number:41, stock:5, counter:0},{id: 8, number:42, stock:5, counter:0},{id: 9, number:43, stock:5, counter:0},{id: 10, number:44, stock:5, counter:0},{id: 11, number:45, stock:5, counter:0}]

const setDataApi = async () => {
  const url = "https://api.mercadolibre.com/sites/MLA/search?category=";
  //------------------------------TODOS LOS IDS DE LAS CATEGORIAS
  const ids = [
    "MLA109027&BRAND=14671",
    "MLA109027&BRAND=14810",
    "MLA109027&BRAND=252310",
    "MLA109027&BRAND=124578",
    "MLA414251&BRAND=58625",
    "MLA416005&BRAND=130142",
    "MLA415194&BRAND=130114",
    "MLA414674&BRAND=1088662",
    "MLA414610&BRAND=2658635",
    "MLA415192&BRAND=1088662",
    "MLA414673&BRAND=238731",
    // 'MLA455893', 'MLA414673' //---> NO TIENEN BRAND
  ].map((e) => url + e); // armo la url ej: "https://api.mercadolibre.com/sites/MLA/search?category=MLA109027&BRAND=14671"
  //console.log(ids)
  const getAllApi = await Promise.all(
    ids.map(async (link) => {
      return (await axios(link)).data.results;
    })
  );

  function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
  
  const cargoalDB = getAllApi.flat().map((e) => {
    // Creando tallas random
       
    return ({
      id: e.id,
      title: e.title,
      image: e.thumbnail,
      brand: e.attributes ? e.attributes[0].values[0].id : "Not found",
      model: e.attributes && e.attributes.length === 3 ? e.attributes[2].value_name : "Not found",
      price: e.price, //parseInt(s.price)
      category: e.category_id,
      size: [{id: 1, number:35, stock:5, counter:0}, {id: 2,number:36, stock:5, counter:0},{id: 3, number:37, stock:5, counter:0},{id: 4, number:38, stock:5, counter:0},{id: 5, number:39, stock:5, counter:0},{id: 6, number:40, stock:5, counter:0},{id: 7, number:41, stock:5, counter:0},{id: 8, number:42, stock:5, counter:0},{id: 9, number:43, stock:5, counter:0},{id: 10, number:44, stock:5, counter:0},{id: 11, number:45, stock:5, counter:0}]
    });
  })
console.log(cargoalDB.size);
  const cargoFinal = cargoalDB.filter(e => e.id !== 'MLA1142122158')
  //cargo los productos al db y necesita que ya este cargada las categoria para que se cree la relacion
  await Promise.all(
    cargoFinal.map(async (el) => {
      const newProduct = await Product.create(el);
      const foundBrand = await Brand.findByPk(el.brand);
      const foundSize = await Size.findAll({where:{ id: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11]}}});
      //console.log(foundSize);
      const foundCategories = await Category.findByPk(el.category);
      await newProduct.setBrand(foundBrand);
      await newProduct.addSize(foundSize);
      await newProduct.setCategory(foundCategories);
      return newProduct;
    })
  );
  //console.log("Datos cargados");
  let dataDb = await Product.findAll({ include: { all: true } });
  return dataDb;
};

const getDbCategories = async () => {
  const foundCategories = await Category.findAll({ include: { all: true } });
  return foundCategories;
};
const getDbBrand = async () => {
  try {
    const brands = await Brand.findAll({ include: { all: true } });

    return brands;

  } catch (error) {
    throw error
  }
}
const getDbSize = async () => {
  const foundSize = await Size.findAll({ include: { all: true } });
  return foundSize;
};


module.exports = { getDb, getDbCategories, setDataApi, getDbBrand, getDbSize };