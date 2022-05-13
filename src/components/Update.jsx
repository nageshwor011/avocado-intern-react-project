import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import {
  Button,
  Col,
  FormGroup,
  Input,
  Container,
  Form,
  Label,
  Row,
} from "reactstrap";

const Update = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [finalUpdateForm, setFinalUpdateForm] =useState({})
  const { id } = useParams();
  const navigate = useNavigate();
  const eventChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };

  const getDataById = async () => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const  {name, username, email, phone, address:{city}} = res.data;
      setUpdateFormData({name, username, email, phone});
      setCity(city)
    } catch (error) {
      console.log("error is ", error);
    }
  };
  
  useEffect(() => {
    getDataById();
  }, [id]);
  const formUpdatehandle = async (e) => {
    e.preventDefault();
    setFinalUpdateForm({...updateFormData, city})
    setIsLoading(true);
    const jsonData = JSON.stringify(finalUpdateForm);
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      jsonData
    );
    if (res.status === 200) {
      setIsLoading(false);
      toast.success(`user id ${id} is updated successfully !`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUpdateFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
      });
      navigate("/");
    }
  };


  return (
    <div>
      <Container className="mt-3">
        <div className="loadingDiv d-flex justify-content-center"></div>
        <Row>
          <Col lg="8" sx="10" className="mx-auto shadow  mb-5 bg-body rounded">
            <div className="loadingDiv d-flex justify-content-between">
              <h3 className="formHeading fontFamily">Update user</h3>
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
            <Form className="p-3" onSubmit={formUpdatehandle}>
              <FormGroup row>
                <Label for="name" sm={2} className="formLabel">
                  Name
                </Label>
                <Col sm={10}>
                  <Input
                    id="name"
                    name="name"
                    disabled={isLoading ? true : false}
                    value={updateFormData.name}
                    onChange={eventChange}
                    placeholder="default"
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
                    name="usernam"
                    disabled={isLoading ? true : false}
                    value={updateFormData.username}
                    onChange={eventChange}
                    placeholder="user name"
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
                    value={updateFormData.email}
                    disabled={isLoading ? true : false}
                    onChange={eventChange}
                    placeholder="email"
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
                    name="city"
                    disabled={isLoading ? true : false}
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                    placeholder="user name"
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
                    disabled={isLoading ? true : false}
                    value={updateFormData.phone}
                    onChange={eventChange}
                    placeholder="phone number"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={2} className="formLabel"></Col>
                <Col sm={10} className="">
                  <div className="d-flex flex-row justify-content-between">
                    <Button
                      type="submit"
                      disabled={isLoading ? true : false}
                      className="me-2 w-100 text-white fontFamily btnUpdate btnSpaceGap "
                    >
                      Update User
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading ? true : false}
                      onClick={() => navigate("/")}
                      color="secondary"
                      className="ms-2 w-100 text-white fontFamily btnSpaceGap"
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Update;
