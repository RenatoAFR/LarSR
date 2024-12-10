import { Container, FloatingLabel, FormControl, FormLabel } from "react-bootstrap";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { urlBase } from "../assets/definicoes2";
import ReactInputMask from "react-input-mask";

const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '450px',
}

export default function FormSugestao(props) {

    //validação
    const [validado, setValidacao] = useState(false);
    const [sugestao, setSugestao] = useState(props.sugestao);

    function manipulaMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setSugestao({ ...sugestao, [id]: valor });
    }

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                fetch(urlBase + "/sugestoes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sugestao)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let sugestoes = props.listaSugest;
                        sugestoes.push(sugestao);
                        props.setSugestao(sugestoes);
                        props.exibirTabela(true);
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {

                fetch(urlBase + "/sugestoes", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sugestao)
                }).then(() => {
                    props.setModoEdicao(false);
                    alert("Atualizado com sucesso!");
                    props.exibirTabela(true);
                }).then(() => {
                    window.location.reload();

                });
            }
            setValidacao(false);
        }
        else {
            setValidacao(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (

        <div style={boxcadall_style}>
            <Container>
                <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>

                    <h3 className="text-center mb-5">Deixa uma sugestão</h3>
                    <Row>
                        <Col>
                            <FormLabel>ID</FormLabel>
                            <FormControl
                                disabled
                                value={sugestao.ID}
                                id="ID">
                            </FormControl>
                        </Col>
                        <Col>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                placeholder=""
                                value={sugestao.nome}
                                id="nome"
                                onChange={manipulaMudanca} />
                            <Form.Control.Feedback type="invalid">Insira um nome</Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Sobrenome</Form.Label>
                            <Form.Control
                                required
                                placeholder=""
                                value={sugestao.sobrenome}
                                id="sobrenome"
                                onChange={manipulaMudanca} />
                            <Form.Control.Feedback type="invalid">Insira um sobrenome</Form.Control.Feedback>
                        </Col>

                        <Col>
                            <Form.Label>Telefone</Form.Label>
                            <ReactInputMask
                                mask={'(99) 99999-9999'}
                                value={sugestao.telefone}
                                onChange={manipulaMudanca}>
                                {() => <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    id="telefone"
                                />}
                            </ReactInputMask>
                            <Form.Control.Feedback type="invalid">Insira um telefone</Form.Control.Feedback>
                        </Col>

                        <Col>
                            <FormLabel>Data</FormLabel>
                            <ReactInputMask
                                mask={'99/99/9999'}
                                value={sugestao.data}
                                onChange={manipulaMudanca}>
                                {() => <FormControl
                                    required
                                    type="text"
                                    id="data"
                                />}
                            </ReactInputMask>
                            <Form.Control.Feedback type="invalid">Insira ua data</Form.Control.Feedback>

                        </Col>

                    </Row>
                    <Form.Label className="mt-4">Descreva a sugestão</Form.Label>
                    <FloatingLabel label="Sugestão">
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="Deixe um comentário"
                            style={{ height: '100px' }}
                            value={sugestao.sugestao}
                            id="sugestao"
                            onChange={manipulaMudanca} />
                        <Form.Control.Feedback type="invalid">Insira uma sugestão</Form.Control.Feedback>
                    </FloatingLabel>

                    <Button className="mt-3" variant="primary" type="submit"> Cadastrar</Button>
                    {' '}
                    <Button className="mt-3" variant="dark" type="button" onClick={() => {
                        props.exibirTabela(true);
                    }}>Voltar</Button>
                </Form>
            </Container>
        </div>
    )
}
