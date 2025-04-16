import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";

const FilterItemForm = ({ show, handleClose, onFilter }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            masterGroup: "",
            category: "",
            itemName: "",
          }}
          onSubmit={(values) => {
            onFilter(values);
            handleClose();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Master Group</Form.Label>
                    <Form.Select
                      name="masterGroup"
                      value={values.masterGroup}
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option value="Restaurant">Restaurant</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option value="KEBABS-6PCS">KEBABS-6PCS</option>
                      <option value="OMELETTES">OMELETTES</option>
                      <option value="SPL KEBABS-6PCS">SPL KEBABS-6PCS</option>
                      <option value="KEBAB-ROLLS">KEBAB-ROLLS</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      name="itemName"
                      value={values.itemName}
                      onChange={handleChange}
                      placeholder="Item Name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-4 gap-2">
                <button className="btn-filter" onClick={handleClose}>
                  cancel
                </button>
                <button className="btn-create" type="submit">
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default FilterItemForm;
