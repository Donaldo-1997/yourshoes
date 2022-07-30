import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postProduct } from '../../redux/actions'
import styles from "./CreateProduct.module.css"
import { Widget } from "@uploadcare/react-widget";

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
        alert("Producto creado")
        setInput({
            title: "",
            model: "",
            image: "",
            price: 0,
            size: [],
            brand: "",
            category: ""
        })
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
        <div>
            <Link to="/" >
              <button>YOUR<span>SHOES</span></button>
            </Link>
            <h1>Publicación de producto</h1>
            <div className={styles.allContainer}>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Título del producto </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.title} name="title" className={styles.input}/>
                        {!errors.title ? null : <span>{errors.title}</span>}
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Modelo del producto </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.model} name="model" className={styles.input}/>
                        {!errors.model ? null : <span>{errors.model}</span>}
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
                        {!errors.price ? null : <span>{errors.price}</span>}
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Talle </label>
                        <select onChange={(e) => handleSelectSize(e)} value={input.size}>
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
                        <ul>
                            {input.size.map(talle => <li key={talle}>{talle}<button value={talle} onClick={(e) => handleDeleteSize(e)}>x</button></li>)}
                        </ul>
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Marca </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.brand} name="brand" className={styles.input}/>
                        {!errors.brand ? null : <span>{errors.brand}</span>}
                    </div>

                    <div className={styles.infoContainer}>
                        <label className={styles.label}>Categoria </label>
                        <select onChange={(e) => handleSelectCategory(e)} value={input.category}>
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

                    {!Object.keys(errors).length ? <button type="submit">Crear producto</button> : <button type="submit" disabled={true}>Crear producto</button>}
                </form>
            </div>
        </div>
    )
}