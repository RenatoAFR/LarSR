import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";



export default function Menu(props) {

    const { signout } = useAuth();
    const navigate = useNavigate();


    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
    };



    return (
        <>
            <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
                <Container >
                    <LinkContainer to="/" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav><font color="black">-------</font></Nav>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="CADASTROS" id="basic-nav-dropdown">
                                <LinkContainer to="/cadastroPacientes"><NavDropdown.Item><strong>PACIENTES</strong></NavDropdown.Item></LinkContainer>

                                <LinkContainer to="/cadastroProfessor"><NavDropdown.Item><strong>PROFESSOR</strong></NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        </Nav>

                        <Nav><font color="black">-------</font></Nav>

                        <NavbarCollapse><LinkContainer to="/cadastroDoacao"><NavDropdown.Item><strong><font color="white">DOAÇÃO</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                        <NavbarCollapse><LinkContainer to="/cadastroVisitantes"><NavDropdown.Item><strong><font color="white">VISITANTES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                        <NavbarCollapse><LinkContainer to="/cadastroSugestao"><NavDropdown.Item><strong><font color="white">SUGESTÕES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                        <NavbarCollapse><LinkContainer to="/cadastroCurso"><NavDropdown.Item><strong><font color="white">CURSOS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                        

                            <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
                                Sair
                            </Button>
                        

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}