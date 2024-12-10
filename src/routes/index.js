import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Menu from "../templates/Menu";

import Tela404 from "../telas/Tela404";
import TelaCadProfessor from "../telas/TelaCadProfessor";
import TelaDoacao from "../telas/TelaDoacao";
import TelaCadSugest from "../telas/TelaCadSugest";
import TelaCadVisitantes from "../telas/TelaCadVisitantes";
import TelaCadPacientes from "../telas/TelaCadPacientes";
import TelaCadCurso from "../telas/TelaCadCurso";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Private Item={Menu} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
          <Route path="/cadastroPacientes" element={<TelaCadPacientes/>}/>
          <Route exact path="/cadastroProfessor" element={<TelaCadProfessor/>}/>
          <Route path="/cadastroDoacao" element={<TelaDoacao/>}/>
          <Route path="/cadastroSugestao" element={<TelaCadSugest/>}/>
          <Route path="/cadastroVisitantes" element={<TelaCadVisitantes/>}/>
          <Route path="/cadastroCurso" element={<TelaCadCurso/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
