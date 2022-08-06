import React from "react";
import { useLocation } from "react-router-dom";
import CreateProduct from "../../CreateProduct/CreateProduct";
import SideBar from "../SideBar/SideBar";
import DatatableProducts_copy from "./DatatableProducts_copy";
import { BackgroundList, ContainerList } from "./StyledAdmin";

export default function AdminProducts() {

    const { pathname } = useLocation()
    console.log(pathname)

    return(
        <BackgroundList>
            <ContainerList>
                <SideBar />
                {pathname === '/admin/products' ? <DatatableProducts_copy /> : <CreateProduct />}
            </ContainerList>
        </BackgroundList>
    )
}