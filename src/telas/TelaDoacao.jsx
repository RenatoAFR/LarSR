import Pagina from "../templates/Pagina";
import FormDoacao from "../formularios/FormDoacao";
import TabelaDoacao from "../tabelas/TabelaDoacao";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../assets/definicoes4";

export default function TelaDoacao(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [doadores, setDoador] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [doadorEmEdicao, setDoadorEdicao] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        bairro: "",
        cidade: "",
        uf: "",
        fone: "",
        email: ""
    })

    function edicaoDoadores(doador) {
        setAtualizando(true);
        setDoadorEdicao(doador);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarDoador(doador) {
        fetch(urlBase + "/doadores", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doador)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("Doador excluído");
                setExibirTabela(true);
                window.location.reload();

            }
            else {
                alert("Não foi possível excluir")
            }
        })
    }

    useEffect(() => {
        fetch(urlBase + "/doadores", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setDoador(dados);
            }
            else {

            }
        });
    }, [exibirTabela]);

    return (
        <Pagina>
            <Container className="border m-6">
                <Alert variant={"secondary"} className="text-center m-3">
                    <font size="6"><strong>Cadastro de Doadores</strong></font></Alert>
                {
                    exibirTabela ?
                        <TabelaDoacao
                            listaDoadores={doadores}
                            setDoador={setDoador}
                            exibirTabela={setExibirTabela}
                            editarDoador={edicaoDoadores}
                            excluirDoador={apagarDoador}
                            setModoEdicao={setModoEdicao}
                            edicaoDoadores={setDoadorEdicao} />
                        :
                        <FormDoacao
                            listaDoadores={doadores}
                            setDoador={setDoador}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            doador={doadorEmEdicao}
                            edicaoDoador={setDoadorEdicao} />
                }
            </Container>
        </Pagina>
    );
}