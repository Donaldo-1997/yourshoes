import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postProduct } from '../../redux/actions'
import styles from "./CreateProduct.module.css"
import { Widget } from "@uploadcare/react-widget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct(){
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({first: true})


    const [input, setInput] = useState({
        title: "",
        model: "",
        image: "",
        price: 0,
        size: [],
        brand: "",
        category: ""
    })

    const imgChange = (file) => {
        setInput({
            ...input,
            image: file.cdnUrl
        })
    }

    const handleDeleteSize = (e) => {
        e.preventDefault()
        const sizes = input.size.filter(talle => {
            return talle !== e.target.value
        })
        setInput({
            ...input,
            size: sizes
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectSize = (e) => {
        setInput({
            ...input,
            size: [...input.size, e.target.value]
        })
    }

    const handleSelectCategory = (e) => {
        setInput({
            ...input,
            category: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postProduct(input))
        setInput({
            title: "",
            model: "",
            image: "",
            price: 0,
            size: [],
            brand: "",
            category: ""
        })
        toast.success("Tu producto fue creado!", {
            className: "cart-toast",
            draggable: true,
            position: toast.POSITION.TOP_CENTER,
          });
    }

    //Validaciones//
    const validations = (input) => {
        let errors = {}
        if(!input.title){
            errors.title = "-Debes ponerle un titulo al producto-"
        }
        else if(input.title?.trim().length < 2){
            errors.title = "-El titulo debe tener al menos 2 caracteres-"
        }
        else if(!input.model){
            errors.model = "-Debes ponerle un modelo al producto-"
        }
        else if(!input.price){
            errors.price = "-Debes ponerle un precio al producto-"
        }
        else if(!input.brand){
            errors.brand = "-Debes ponerle una marca al producto-"
        }
        return errors
    }

    return(
        <div className={styles.Container}>
            <Link to="/" >
              <button className={styles.homeButton}>YOUR<span className={styles.shoes}>SHOES</span></button>
            </Link>
            <h1 className={styles.title}>Publicación de producto</h1>
            <div className={styles.allContainer}>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Título del producto </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.title} name="title" className={styles.input}/>
                        {!errors.title ? null : <span className={styles.error}>{errors.title}</span>}
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Modelo del producto </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.model} name="model" className={styles.input}/>
                        {!errors.model ? null : <span className={styles.error}>{errors.model}</span>}
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Imágen </label>
                        <Widget
                            crop="free, 16:9, 4:3, 5:4, 1:1"
                            publicKey="351fcecfb85786702708"
                            clearable
                            onChange={imgChange}
                        />
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Precio </label>
                        <input onChange={(e) => handleChange(e)} type="number" value={input.price} name="price" className={styles.input}/>
                        {!errors.price ? null : <span className={styles.error}>{errors.price}</span>}
                    </div>

                    <div className={styles.tallesContainer}>
                        <label className={styles.label}>Talle </label>
                        <select onChange={(e) => handleSelectSize(e)} value={input.size} className={styles.select}>
                            <option>35</option>
                            <option>36</option>
                            <option>37</option>
                            <option>38</option>
                            <option>39</option>
                            <option>40</option>
                            <option>41</option>
                            <option>42</option>
                            <option>43</option>
                            <option>44</option>
                            <option>45</option>
                        </select>
                        <ul className={styles.ulTalles}>
                            {input.size.map(talle => <li key={talle} className={styles.liTalle}>{talle}<button value={talle} onClick={(e) => handleDeleteSize(e)} className={styles.xButton}>x</button></li>)}
                        </ul>
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Marca </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.brand} name="brand" className={styles.input}/>
                        {!errors.brand ? null : <span className={styles.error}>{errors.brand}</span>}
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Categoria </label>
                        <select onChange={(e) => handleSelectCategory(e)} value={input.category} className={styles.select}>
                            <option>Zapatillas</option>
                            <option>Botas y Botinetas</option>
                            <option>Sandalias y ojotas</option>
                            <option>Stilletos y plataformas</option>
                            <option>Mocasines y oxfords</option>
                            <option>Pantuflas</option>
                            <option>Chatitas</option>
                            <option>Alpargatas</option>
                        </select>
                    </div>
                    <div>
                        {!Object.keys(errors).length ? <button type="submit" className={styles.createButton}>CREAR PRODUCTO</button> : <button type="submit" className={styles.createButton} disabled={true}>CREAR PRODUCTO</button>}
                        <ToastContainer/>
                    </div>
                </form>
            </div>
        </div>
    )
}