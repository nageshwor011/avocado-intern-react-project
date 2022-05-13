import axios from "axios";
import React, { useState } from "react";
import { Button, Col, FormGroup, Input, Form, Label, Row } from "reactstrap";
import { ThreeDots } from "react-loader-spinner";
import DisplayTable from "./DisplayTable";
import { toast } from "react-toastify";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [city, setCity]= useState("")
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [finalFormData, setFinalFormData] =useState({});
  const eventChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const formSubmit = async (e) => {
    setIsLoading(true);
    setFinalFormData({...formData, address:{city}})
    e.preventDefault();

    //posting form data of users in api
    const jsonData = JSON.stringify(finalFormData);
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      jsonData
    );
    
    if (res.data.id === 11) {
      setIsFormSubmited(true)
      setFormData({
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
      });
      setCity("")
      toast.success(' new user with id 11 is added!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <Row className="mt-3 mx-auto">
        <Col lg="8" sx="10" className="mx-auto shadow  mb-5 bg-body rounded">
          <div className="loadingDiv d-flex justify-content-between">
            <h3 className="formHeading fontFamily">Create New User</h3>
            {isLoading ? (
              <ThreeDots
                color="blue"
                height={50}
                width={50}
                ariaLabel="three-circles-rotating"
              />
            ) : null}
            <span></span>
          </div>
          <hr />
          <Form className="p-3" onSubmit={formSubmit}>
            <FormGroup row>
              <Label for="name" sm={2} className="formLabel">
                Name
              </Label>
              <Col sm={10}>
                <Input
                  id="name"
                  name="name"
                  disabled={isLoading ? true : false}
                  value={formData.name}
                  onChange={eventChange}
                  placeholder="Enter full name"
                  type="text"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="username" sm={2} className="formLabel">
                User name
              </Label>
              <Col sm={10}>
                <Input
                  id="username"
                  name="username"
                  required
                  disabled={isLoading ? true : false}
                  value={formData.username}
                  onChange={eventChange}
                  placeholder="Enter username"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={2} className="formLabel">
                Email
              </Label>
              <Col sm={10}>
                <Input
                  id="email"
                  name="email"
                  required
                  disabled={isLoading ? true : false}
                  value={formData.email}
                  onChange={eventChange}
                  placeholder="Enter email id"
                  type="email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="address" sm={2} className="formLabel">
                Address
              </Label>
              <Col sm={10}>
                <Input
                  id="address"
                  name={"city"}
                  required
                  disabled={isLoading ? true : false}
                  value={city}
                  onChange={(e)=>{setCity(e.target.value)}}
                  placeholder="Enter address"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="phone" sm={2} className="formLabel">
                Phone
              </Label>
              <Col sm={10}>
                <Input
                  id="phone"
                  name="phone"
                  required
                  disabled={isLoading ? true : false}
                  value={formData.phone}
                  onChange={eventChange}
                  placeholder="Enter phone number"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={2} className="formLabel"></Col>
              <Col sm={10} className="">
                <Button
                  type="submit"
                  disabled={isLoading ? true : false}
                  className="w-100 btnAdd fontFamily"
                >
                  Add User
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <DisplayTable isFormSubmited={isFormSubmited} />
      </Row>
    </div>
  );
};

export default AddUser;
