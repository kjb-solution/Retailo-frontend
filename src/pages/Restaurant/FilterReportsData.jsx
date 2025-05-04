import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";

const FilterReportsData = ({ show, handleClose, onFilter }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Filter Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            fromDate: "",
            toDate: "",
            entity: "",
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
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="fromDate"
                      value={values.fromDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="toDate"
                      value={values.toDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Entity (Location)</Form.Label>
                    <Form.Select
                      name="entity"
                      value={values.entity}
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option value="Chennai">Chennai</option>
                      {/* Add more locations here if needed */}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="itemName"
                      placeholder="Item Name"
                      value={values.itemName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-4 gap-2">
                <button
                  className="btn-filter"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
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

export default FilterReportsData;
