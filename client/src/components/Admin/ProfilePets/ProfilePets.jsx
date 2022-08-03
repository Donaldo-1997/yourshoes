import React, { useState, useEffect } from 'react';
import SideBar from "../SideBar/SideBar";
import Swal from "sweetalert2";
import {
    BackgroundProfilePets,
    ButtonEditPet,
    ContainerProfilePets,
    ContInput,
    DivTitleProfile,
    FolderIcon,
    Form,
    GridDiv,
    ImagePetAdmin,
    Input,
    InputRadio,
    Label,
    Left,
    Right,
    TitleProfilePets,
    SubtitleProfilePets,
} from "./StyledProfilePets";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom'
import { editPet, getById } from '../../../redux/actions/index';
import axios from 'axios'

export default function ProfilePets() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const petsId = useSelector((state) => state.petDetail)
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    console.log(petsId)

    const [input, setInput] = useState({
    })

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])


    function handleChange(e) {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (input.name === '' && input.weight === '') {
        //   return Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Completa todos los campos!',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
        // }

        // if(res.data.error){
        //   return Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: res.data.error,
        //     showConfirmButton: false,
        //     timer: 1000
        // })
        // }
        console.log(e)
        axios.put(`/pet/update/${id}`, input).then((r) => {
            console.log(input)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos Cambiados!',
                showConfirmButton: true,
                timer: 3000
            })
                .then(() => { navigate("/admin/pets") })
        }, err => console.log(err))
    }

    return (
        <BackgroundProfilePets>
            <ContainerProfilePets>
                <SideBar />
                <div>
                    <DivTitleProfile>
                        <TitleProfilePets>Perfil de Mascota</TitleProfilePets>
                    </DivTitleProfile>
                    <DivTitleProfile>
                        <GridDiv>
                            <Left>
                                <ImagePetAdmin src={petsId.image} alt='pet' />
                            </Left>
                            <Right>
                                <Form onSubmit={handleSubmit}>
                                    <SubtitleProfilePets>Edita esta mascota:</SubtitleProfilePets>
                                    <ContInput>
                                        <Label>Tamaño:</Label>
                                        <InputRadio onChange={handleChange} type="radio" name="size" value="small" /> Pequeño
                                        <InputRadio onChange={handleChange} type="radio" name="size" value="medium" /> Mediano
                                        <InputRadio onChange={handleChange} type="radio" name="size" value="big" /> Grande
                                    </ContInput>
                                    <ContInput>
                                        <Label>Nombre:</Label>
                                        <Input onChange={handleChange} name="name" type='text' placeholder={petsId.name} />
                                    </ContInput>
                                    <ContInput>
                                        <Label>Peso:</Label>
                                        <Input onChange={handleChange} name="weight" type='number' placeholder={petsId.weight ? petsId.weight : 'Desconocido'} />
                                    </ContInput>
                                    <ContInput>
                                        <Label>Pelaje:</Label>
                                        <InputRadio onChange={handleChange} type="radio" name="fur" value="true" /> Corto
                                        <InputRadio onChange={handleChange} type="radio" name="fur" value="false" /> Largo
                                    </ContInput>
                                    <ContInput>
                                        <Label>Castrado:</Label>
                                        <InputRadio onChange={handleChange} type="radio" name="castration" value="true" /> Si
                                        <InputRadio onChange={handleChange} type="radio" name="castration" value="false" /> No
                                        <InputRadio onChange={handleChange} type="radio" name="castration" value="unknown" /> Desconocido
                                    </ContInput>
                                    <ContInput>
                                        <Label>Vacunado:</Label>
                                        <InputRadio onChange={handleChange} type="radio" name="vaccination" value="true" /> Si
                                        <InputRadio onChange={handleChange} type="radio" name="vaccination" value="false" /> No
                                        <InputRadio onChange={handleChange} type="radio" name="vaccination" value="unknown" /> Desconocido
                                    </ContInput>
                                    <ContInput>
                                        <Label>Estado:</Label>
                                        <InputRadio type="radio" name="state" value="adopt" /> Adoptado
                                        <InputRadio type="radio" name="state" value="transit" /> Transito
                                        <InputRadio type="radio" name="state" value="lost" /> Perdido
                                    </ContInput>
                                    <ButtonEditPet>Enviar</ButtonEditPet>
                                </Form>
                            </Right>
                        </GridDiv>
                    </DivTitleProfile>

                </div>
            </ContainerProfilePets>
        </BackgroundProfilePets>
    )
}