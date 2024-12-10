import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import React from "react";
import { urlBase } from "../assets/definicoes4";


export default function Fichario(props) {
  const [validado, setValidado] = useState(false);
  const [doador, setDoador] = useState(props.doador);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setDoador({ ...doador, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {

      if (!props.modoEdicao){
        fetch(urlBase+"/doadores",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(doador)
            }).then((resposta)=>{
            return resposta.json();  
            }).then((dados)=>{
            if (dados.status){
                props.setModoEdicao(false);
                let doadores = props.listaDoadores;
                doadores.push(doador);
                props.setDoador(doadores);
                props.exibirTabela(true);
                window.location.reload();
  
            }
            window.alert(dados.mensagem);
        }).catch((erro)=>{
            window.alert("Erro ao executar a requisição: " + erro.message);
        })
      }
      else {

        fetch(urlBase + "/doadores", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(doador)
        }).then(() => {
          props.setModoEdicao(false);
          alert("Atualizado com sucesso!");
          props.exibirTabela(true);
        }).then(() => {
          window.location.reload();

        });
      }
      setValidado(false);
    }
    else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }


  return (
    <>
      <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>

        <Row >
          <Form.Group as={Col} md="5">
            <Form.Label><strong>Nome completo</strong></Form.Label>
            <Form.Control type="text" placeholder="Informe o nome" value={doador.nome} id="nome" onChange={manipularMudanca} required />
            <Form.Control.Feedback type='invalid'>
              Preencha o nome corretamente
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Label><strong>CPF</strong></Form.Label>
            <Form.Control type="text" placeholder="000.000.000-00" value={doador.cpf} id="cpf" onChange={manipularMudanca} required />
            <Form.Control.Feedback type='invalid'>
              Preencha o CPF
            </Form.Control.Feedback>
          </Form.Group>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label><strong>Endereço</strong></Form.Label>
              <Form.Control type="text" placeholder="Av. Brasil nº 10" value={doador.endereco} id="endereco" onChange={manipularMudanca} required />
              <Form.Control.Feedback type='invalid'>
                Informe o endereço
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label><strong>Bairro</strong></Form.Label>
              <Form.Control type="text" placeholder="Centro" value={doador.bairro} id="bairro" onChange={manipularMudanca} required />
              <Form.Control.Feedback type='invalid'>
                Informe o bairro
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Form.Group as={Col} md="6">
            <Form.Label><strong>Cidade</strong></Form.Label>
            <Form.Control type="text" placeholder="Cidade" value={doador.cidade} id="cidade" onChange={manipularMudanca} required />
            <Form.Control.Feedback type="invalid">
              Digite sua cidade
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Form.Group as={Col} md="8">
              <Form.Label><strong>Estado</strong></Form.Label>
              <Form.Select value={doador.uf} id="uf" onChange={manipularMudanca} required>
                <option value="">Selecione o estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione o estado
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} md="8">
              <Form.Label><strong>Fone</strong></Form.Label>
              <Form.Control type="text" placeholder="(  ) 00000-0000" value={doador.fone} id="fone" onChange={manipularMudanca} required />
              <Form.Control.Feedback type="invalid">
                Informe o telefone
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group md="4">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control type="text" placeholder="nome@email.com.br" value={doador.email} id="email" onChange={manipularMudanca} required />
              <Form.Control.Feedback type="invalid">
                Informe o email
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="btn-group" />
        <Row>
          <col-2>
            <center><div className="btn-group">
              <center><Button type="submit">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button></center>
              <center><Button type="button" onClick={() => {
                props.exibirTabela(true);
              }}><strong>Voltar</strong></Button></center>
            </div></center>
          </col-2>
        </Row>
      </Form>
    </>
  );
}