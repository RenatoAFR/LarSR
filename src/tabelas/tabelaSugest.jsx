import { Button, Container, Table, Form } from "react-bootstrap";
import { urlBase } from "../assets/definicoes2";

export default function TabelaSugest(props) {

    function filtrarSugestao(e) {
        const termoBusca = e.currentTarget.value;
        fetch(urlBase + "/sugestoes", { method: "GET" })
            .then((resposta) => { return resposta.json() })
            .then((listaSugestoes) => {
                if (Array.isArray(listaSugestoes)) {
                    const resultado = listaSugestoes.filter((sugestao) => sugestao.nome.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setSugestao(resultado);
                }
            });
    }
    return (
        <Container>
            <h3 className="d-flex justify-content-center align-items-center">Sugestões cadastradas</h3>
            <Container className="d-flex mt-4 mb-3">
                <Form.Label className="me-2"><strong>Pesquisa: </strong></Form.Label>
                <Form.Control type="text"
                    id="termoBusca"
                    onChange={filtrarSugestao}>
                </Form.Control>
            </Container>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Telefone</th>
                        <th>Data</th>
                        <th>Sugestão</th>
                        <th>Ações</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        props.listaSugest?.map((sugestao) => {
                            return <tr key={sugestao.ID}>

                                <td>{sugestao.ID}</td>
                                <td>{sugestao.nome}</td>
                                <td>{sugestao.sobrenome}</td>
                                <td>{sugestao.telefone}</td>
                                <td>{sugestao.data}</td>
                                <td>{sugestao.sugestao}</td>
                                <td>
                                    <Button onClick={() => { props.editarSugestao(sugestao) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil"
                                            viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </Button> {' '}

                                    <Button variant="danger" onClick={() => { props.excluirSugestao(sugestao) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>

            </Table>

            <Button className="mb-4 mt-2"
                onClick={() => {
                    props.exibirTabela(false);
                    props.setModoEdicao(false);
                }}>
                Cadastrar
            </Button>

        </Container>

    )
}