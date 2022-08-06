import React from 'react';
import {
    ListDiv,
    List,
    Title,
    LiList,
    IconMenu,
    Icon,
    Icon2,
    Text,
    LinkList,
    IconCreate,
} from './StyledSideBar';

export default function SideBar() {

    return (
        <ListDiv>

            <List>
                <Title>MENU</Title>
                <LiList>
                    <IconMenu />
                    <LinkList to='/admin'>
                        <Text>Dashboard</Text>
                    </LinkList>
                </LiList>
                <LiList>
                    <Icon />
                    <LinkList to='/admin/users'>
                        <Text>Usuarios</Text>
                    </LinkList>
                </LiList>
                <LiList>
                    <Icon2 />
                    <LinkList to='/admin/products'>
                        <Text>Productos</Text>
                    </LinkList>
                </LiList>
                <LiList>
                    <IconCreate />
                    <LinkList to='/admin/create-product'>
                        <Text>Nuevo Producto</Text>
                    </LinkList>
                </LiList>
            </List>
        </ListDiv>
    )
}