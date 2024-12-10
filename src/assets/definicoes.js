export const urlBase = "http://localhost:3001/cadastroPaciente"

const myHeaders = new Headers();
myHeaders.append("Content-type", "application/json");

export const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect:"follow",
};