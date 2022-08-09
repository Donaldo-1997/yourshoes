import React from "react";
import { useLocation } from "react-router-dom";
import CreateProduct from "../../CreateProduct/CreateProduct";
import SideBar from "../SideBar/SideBar";
import DatatableProducts_copy from "./DatatableProducts_copy";
import { BackgroundList, ContainerList } from "./StyledAdmin";
import NavBar2 from "../../Navbar2/Navbar2"

export default function AdminProducts() {

    const { pathname } = useLocation()
    console.log(pathname)

    return(
        <div>
            <NavBar2/>
            <BackgroundList>
                <ContainerList>
                    <SideBar />
                    {pathname === '/admin/products' ? <DatatableProducts_copy /> : <CreateProduct />}
                </ContainerList>
            </BackgroundList>
        </div>
    )
}