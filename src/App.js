import React from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";

class App extends React.Component {
  state = {
    data: [],
    axiusData: [],
    modalActualizar: false,
    modalInsertar: false,
    searchTerm: '',
    form: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone_number: "",
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get("https://1fefe308-dbc0-42db-8417-7813b40a35c2.mock.pstmn.io/clients")
      .then(response => {
        this.setState({ axiusData: response.data, data: response.data });
      })
      .catch(error => console.error("Error al obtener los datos: ", error));
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
      }
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = () => {
    const arreglo = this.state.data;
    const index = arreglo.findIndex(item => item.id === this.state.form.id);
    if (index !== -1) {
      arreglo[index] = this.state.form;
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  eliminar = (dato) => {
    const opcion = window.confirm("Estás seguro que deseas eliminar el elemento " + dato.id);
    if (opcion) {
      const arreglo = this.state.data.filter(item => item.id !== dato.id);
      this.setState({ data: arreglo });
    }
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = this.state.data.concat(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value }, () => {
      if (this.state.searchTerm !== '') {
        const filteredData = this.state.axiusData.filter(item => item.id.toString() === this.state.searchTerm);
        this.setState({ data: filteredData });
      } else {
        this.setState({ data: this.state.axiusData });
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <Button color="success" onClick={this.mostrarModalInsertar}>Crear</Button>
          <Input
            type="text"
            placeholder="Buscar por ID..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            style={{ margin: '20px 0', width: '200px' }}
          />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>Dirección</th>
                <th>Número de Teléfono</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.first_name}</td>
                  <td>{dato.last_name}</td>
                  <td>{dato.email}</td>
                  <td>{dato.address}</td>
                  <td>{dato.phone_number}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modales para actualizar y insertar */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Nombre:</Label>
              <Input
                name="first_name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.first_name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Apellido:</Label>
              <Input
                name="last_name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.last_name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Correo Electrónico:</Label>
              <Input
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>
            <FormGroup>
              <Label>Dirección:</Label>
              <Input
                name="address"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.address}
              />
            </FormGroup>
            <FormGroup>
              <Label>Número de Teléfono:</Label>
              <Input
                name="phone_number"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.phone_number}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editar}>Editar</Button>
            <Button color="danger" onClick={this.cerrarModalActualizar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Nombre:</Label>
              <Input
                name="first_name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Apellido:</Label>
              <Input
                name="last_name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Correo Electrónico:</Label>
              <Input
                name="email"
                type="email"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Dirección:</Label>
              <Input
                name="address"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Número de Teléfono:</Label>
              <Input
                name="phone_number"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>Insertar</Button>
            <Button className="btn btn-danger" onClick={this.cerrarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
