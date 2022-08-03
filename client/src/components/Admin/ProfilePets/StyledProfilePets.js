import styled from "styled-components";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

export const BackgroundProfilePets = styled.div`
    background-color: ${(props) => props.theme.background};
    height: 100vh;
`

export const ContainerProfilePets = styled.div`
    display: grid;
    grid-template-columns: 150px 1183px;
    gap: 1rem;
`

export const DivTitleProfile = styled.div`
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 10px;
    margin: 20px;
`

export  const GridDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 500px);
`

export const Left = styled.div`
    width: 12rem;
    margin-left: 30px;
`

export const Right = styled.div`
    display: 2;
`

export const ImagePetAdmin = styled.img`
    width: 11rem;
    height: 11rem;
    border-radius: 50%;
    margin-left: 50%;
    margin-top: 40px;
`

export const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-right: 60px;
`

export const ContInput = styled.div`
    color: ${(props) => props.theme.secondary};
    width: 40%;
`

export const Input = styled.input`
    width: 100%;
    padding: 5px;
    outline: none;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.primary};
`

export const Label = styled.label`
    color: ${(props) => props.theme.secondary};
    display: flex;
    align-items: center;
    gap: 10px;
`

export const ButtonEditPet = styled.button`
    width: 150px;
    padding: 10px;
    border: none;
    background-color: ${(props) => props.theme.primary};
    color: #fff;
    font-weight: 700;
    cursor: pointer;
`

export const FolderIcon = styled(AddPhotoAlternateOutlinedIcon)`
    cursor: pointer;
`

export const InputRadio = styled.input`
    color: ${(props) => props.theme.secondary};
    margin: 0;
`

export const TitleProfilePets = styled.h1`
    font-size: 1.5rem;
    color: ${(props) => props.theme.secondary};
`

export const SubtitleProfilePets = styled.h1`
    font-size: 1.1rem;
    color: ${(props) => props.theme.secondary};
`

export const TextEditPets = styled.h1`
    font-size: 1rem;
    color: ${(props) => props.theme.secondary};
`

export const SpanEdit = styled.p`
    color: ${(props) => props.theme.secondary};
    font-size: .5rem;
`