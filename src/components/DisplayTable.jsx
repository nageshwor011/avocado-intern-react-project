import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Table,
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
} from "reactstrap";

const DisplayTable = ({ isFormSubmited }) => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //modal for delete data
  const [modal, setModal] = useState(false);
  const [selectId, setSelectId] = useState();
  const toggle = () => setModal(!modal);

  const getApiData = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setTableData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AskToDelete = (id) => {
    setSelectId(id);
    toggle();
  };
  const DeleteDataFromApi = async () => {
    toggle();
    setIsLoading(true);
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${selectId}`
    );
    if (res.status === 200) {
      setIsLoading(false);
      toast.success(`user ID ${selectId} has been deleted!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    getApiData();
  }, [isFormSubmited]);
  return (
    <div>
      <h5 className="text-capitalize text-center tableHeading fontFamily">
        Users Data from API displayed in table
      </h5>
      <hr />

      <div className="table-responsive-md">
        <ToastContainer theme="colored" />
        <div className="loadingDiv d-flex justify-content-between">
          {isLoading ? (
            <>
              <h3 className="formHeading fontFamily">Deleting user</h3>
              <ThreeDots
                color="blue"
                height={50}
                width={50}
                ariaLabel="three-circles-rotating"
              />
            </>
          ) : null}
          <span></span>
        </div>
        <Table striped hover bordered className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>user Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              const { id, name, email, username, address, phone } = item;
              return (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                  <td>{phone}</td>
                  <td>
                    <Link to={`/update-user/${id}`}>
                      {" "}
                      <Button color="warning" className="me-1 btnEdtDlt">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      color="danger"
                      className="ms-1 btnDlt"
                      onClick={() => AskToDelete(id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* // modal for deleting row of table*/}
        <Modal isOpen={modal} centered>
          <ModalBody>
            <h3 className="text-danger">
              Are you sure want to delet this user ?
            </h3>
          </ModalBody>
          <Row className="p-3">
            <Col className="d-flex justify-content-end">
              <Button
                color="danger"
                className="me-3"
                onClick={() => {
                  DeleteDataFromApi();
                }}
              >
                YES
              </Button>
              <Button color="secondary" onClick={toggle}>
                NO
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    </div>
  );
};

export default DisplayTable;
