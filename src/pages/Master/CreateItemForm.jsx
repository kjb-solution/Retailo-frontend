import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";

const CreateItemForm = ({
  show,
  handleClose,
  mode = "create",
  initialValues,
  onSubmit,
}) => {
  const isEditMode = mode === "edit";

  const validationSchema = Yup.object().shape({
    itemCode: Yup.string().required("Item Code is required"),
    itemName: Yup.string().required("Item Name is required"),
    rate: Yup.string().required("Rate is required"),
    rsRate: Yup.string().required("Rs Rate is required"),
    onlineRate: Yup.string().required("OnlineRate is required"),
    estimateTime: Yup.string().required("Estimate Time is required"),
  });

  const masterGroup = ["Restaurant", "Tea shop", "Bakery", "Gym", "Spa"];
  const categories = [
    "Omelette",
    "Chicken Tandoori",
    "Grill Chicken",
    "Gongura Chicken",
    "Chettinad Chicken",
    "Chicken 65",
    "Paneer Tikka",
    "Gobi Manchurian",
  ];

  const groupNames = [
    "Veg",
    "Non Veg",
    "Sea Food",
    "Mutton",
    "Chicken",
    "Pork",
    "Beef",
  ];

  const departments = [
    "Front Office",
    "Main Kitchen",
    "Admin",
    "Outdoor Catering",
    "Bakery",
  ];
  const UOM = [
    "ml",
    "150ml",
    "250ml",
    "500ml",
    "liter",
    "grams",
    "kg",
    "nos",
    "piece",
    "plate",
    "cup",
    "pack",
  ];

  const defaultValues = {
    masterGroup: "",
    category: "",
    group: "",
    department: "",
    itemCode: "",
    itemName: "",
    rate: "",
    rsRate: "",
    onlineRate: "",
    uom: "",
    estimateTime: "",
    status: "Active",
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>{isEditMode ? "Edit Item" : "Create Item"}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Modal.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Label>Master Group</Form.Label>
                  <Field
                    as="select"
                    name="masterGroup"
                    className="form-control"
                  >
                    <option>--Select--</option>
                    {masterGroup.map((mas) => (
                      <option key={mas} value={mas}>
                        {mas}
                      </option>
                    ))}
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Category</Form.Label>
                  <Field as="select" name="category" className="form-control">
                    <option>--Select--</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Group Name</Form.Label>
                  <Field as="select" name="group" className="form-control">
                    <option>--Select--</option>
                    {groupNames.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Department</Form.Label>
                  <Field as="select" name="department" className="form-control">
                    <option>--Select--</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
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
                      touched.onlineRate && errors.onlineRate
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>UOM</Form.Label>
                  <Field as="select" name="uom" className="form-control">
                    <option>--Select--</option>
                    {UOM.map((uom) => (
                      <option key={uom} value={uom}>
                        {uom}
                      </option>
                    ))}
                  </Field>
                </Col>
                <Col md={4}>
                  <Form.Label>Estimate Time (Min)</Form.Label>
                  <Field
                    name="estimateTime"
                    className={`form-control ${
                      touched.estimateTime && errors.estimateTime
                        ? "is-invalid"
                        : ""
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
              <button
                className="btn-filter"
                onClick={handleClose}
                type="button"
              >
                Cancel
              </button>
              <button type="submit" className="btn-create">
                {isEditMode ? "Update" : "Create"}
              </button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateItemForm;
