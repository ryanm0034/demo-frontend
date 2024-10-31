import React, { useState, useEffect } from "react";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";

const CustomerComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getCustomer(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setMiddleName(response.data.middleName ? response.data.middleName : "");
          setLastName(response.data.lastName);
          setEmail(response.data.emailAddress);
          setPhone(response.data.phoneNumber);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateCustomer(e) {
    e.preventDefault();

    if (validateForm()) {
      const customer = {
        firstName,
        middleName,
        lastName,
        emailAddress: email,
        phoneNumber: phone,
      };
      console.log(customer);

      if (id) {
        updateCustomer(id, customer)
          .then((response) => {
            console.log(response.data);
            navigator("/customers");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createCustomer(customer)
          .then((response) => {
            console.log(response.data);
            navigator("/customers");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    if (phone.trim()) {
      errorsCopy.phone = "";
    } else {
      errorsCopy.phone = "Phone Number is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Customer</h2>;
    } else {
      return <h2 className="text-center">Add Customer</h2>;
    }
  }
  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Customer First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Middle Name:</label>
                <input
                  type="text"
                  placeholder="Enter Customer Middle Name"
                  name="middleName"
                  value={middleName}
                  className={`form-control ${errors.middleName ? "is-invalid" : ""}`}
                  onChange={(e) => setMiddleName(e.target.value)}
                ></input>
                {errors.middleName && (
                  <div className="invalid-feedback"> {errors.middleName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Customer Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Customer Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Phone:</label>
                <input
                  type="text"
                  placeholder="Enter Customer Phone Number"
                  name="phone"
                  value={phone}
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
                {errors.phone && (
                  <div className="invalid-feedback"> {errors.phone} </div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateCustomer}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerComponent;
