import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";

const CreateItemForm = ({ show, handleClose }) => {
  const validationSchema = Yup.object().shape({
    itemCode: Yup.string().required("Item Code is required"),
    itemName: Yup.string().required("Item Name is required"),
    rate: Yup.string().required("Rate is required"),
    rsRate: Yup.string().required("Rs Rate is required"),
    onlineRate: Yup.string().required("OnlineRate is required"),
    estimateTime: Yup.string().required("EstimateTIme is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data: ", values);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Item</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          masterGroup: "Restaurant",
          category: "",
          groupName: "",
          department: "",
          itemCode: "",
          itemName: "",
          rate: "",
          rsRate: "",
          onlineRate: "",
          uom: "",
          estimateTime: "",
          status: "Active",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Modal.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Label>Master Group</Form.Label>
                  <Field name="masterGroup" className="form-control" disabled />
                </Col>
                <Col md={4}>
                  <Form.Label>Category</Form.Label>
                  <Field as="select" name="category" className="form-control">
                    <option>--Select--</option>
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Group Name</Form.Label>
                  <Field as="select" name="groupName" className="form-control">
                    <option>--Select--</option>
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Department</Form.Label>
                  <Field as="select" name="department" className="form-control">
                    <option>--Select--</option>
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Item Code</Form.Label>
                  <Field
                    name="itemCode"
                    className={`form-control ${
                      touched.itemCode && errors.itemCode ? "is-invalid" : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>Item Name</Form.Label>
                  <Field
                    name="itemName"
                    className={`form-control ${
                      touched.itemName && errors.itemName ? "is-invalid" : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>Rate</Form.Label>
                  <Field
                    name="rate"
                    className={`form-control ${
                      touched.rate && errors.rate ? "is-invalid" : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>RS Rate</Form.Label>
                  <Field
                    name="rsRate"
                    className={`form-control ${
                      touched.rsRate && errors.rsRate ? "is-invalid" : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>Online Rate</Form.Label>
                  <Field
                    name="onlineRate"
                    className={`form-control ${
                      touched.onlineRate && errors.onlineRate ? "is-invalid" : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>UOM</Form.Label>
                  <Field as="select" name="uom" className="form-control">
                    <option>--Select--</option>
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Estimate Time (Min)</Form.Label>
                  <Field
                    name="estimateTime"
                    className={`form-control ${
                      touched.estimateTime && errors.estimateTime ? "is-invalid" : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>Status</Form.Label>
                  <Field as="select" name="status" className="form-control">
                    <option>Active</option>
                    <option>Inactive</option>
                  </Field>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn-filter" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn-create">
                Create
              </button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateItemForm;
