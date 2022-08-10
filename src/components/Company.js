import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from 'react-bootstrap';

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import userService from "../services/user.service";

const Company = () => {
  const [newName, setNewName] = useState("");
  const [result, setResult] = useState("");
  const [table, setTable] = useState([]);
  const [modalAddModal, setModalAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setModalAddModal(false);
  }
  const handleShowAddModal = () => {
    setModalAddModal(true);
  }

  const handleAdd = async () => {
    setResult("");
    userService.addCompany({companyName: newName}).then(
      (response) => {
        setResult(response.data.message);
        setTable(response.data.result);
      },
      (error) => {
        setResult(error);
      }
    );    
  }

  useEffect(() => {
    userService.companies().then(
      (response) => {
        setTable(response.data.result);
      },
      (error) => {
        setResult(error);
      }
    );  
  }, []);

  return (
    <div className="container">
      <Button variant="primary" onClick={handleShowAddModal}>Register Company</Button>
      <br />
      <hr />
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Register date</th>
        </tr>
      </thead>
      <tbody>
        {
          table.length > 0 ?
            table.map((item, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.registerAt}</td>
              </tr>
            ))
          :
            <tr><td colSpan={3} style={{textAlign: "center"}}>No result to display</td></tr>
        }
      </tbody>

      <Modal show={modalAddModal} onHide={handleCloseAddModal}>
        <Modal.Header>
          <Modal.Title>Register Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>New Company Name</Form.Label>
              <Form.Control
                name="buyPro1"
                type="text"
                placeholder="company name"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              />
            </Form.Group>
            <p style={{color: "green"}}>{result === "" ? "" : result}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

    </Table>
    </div>
  );
};

export default Company;
