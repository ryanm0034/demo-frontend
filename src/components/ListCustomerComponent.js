import React, { useEffect, useState } from "react";
import { deleteCustomer, listCustomers } from "../services/CustomerService";
import { useNavigate } from "react-router-dom";

const ListCustomerComponent = () => {
  const [customers, setCustomers] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllCustomers();
  }, []);

  function getAllCustomers() {
    listCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addNewCustomer() {
    navigator("/add-customer");
  }

  function updateCustomer(id) {
    navigator(`/edit-customer/${id}`);
  }

  function removeCustomer(id) {
    console.log(id);

    deleteCustomer(id)
      .then((response) => {
        getAllCustomers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Customers</h2>
      <button className="btn btn-primary mb-2" onClick={addNewCustomer}>
        Add Customer
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer First Name</th>
            <th>Customer Last Name</th>
            <th>Customer Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.emailAddress}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateCustomer(customer.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeCustomer(customer.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCustomerComponent;
