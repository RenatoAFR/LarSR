import { Container } from "react-bootstrap";
import Cabecalho from "../templates/Cabecalho";
import Menu from "../templates/Menu";

export default function Pagina(props) {
    return(
        <>
            <Cabecalho texto="Central de Gerenciamento" />
            <Menu />
            <Container>{props.children}</Container>
        </>
    );

}