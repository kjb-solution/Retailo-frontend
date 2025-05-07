import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { CloseSVG } from "../../assets/image";

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
    onlineRate: Yup.string().required("Online Rate is required"),
    estimateTime: Yup.string().required("Estimate Time is required"),
  });

  const masterGroup = ["Restaurant", "Tea shop", "Bakery", "Gym", "Spa"];
  const categories = ["Omelette", "Chicken Tandoori", "Grill Chicken"];
  const groupNames = ["Veg", "Non Veg", "Sea Food"];
  const departments = ["Front Office", "Main Kitchen", "Bakery"];
  const UOM = ["ml", "kg", "nos", "plate", "pack"];

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
    <>
      {show && <div className="drawer-backdrop" onClick={handleClose}></div>}
      <div className={`drawer-form ${show ? "open" : ""}`}>
        <div className="drawer-header">
          <h5 className="slider-header">
            {isEditMode ? "Edit Item" : "Create Item"}
          </h5>
          <button className="close-btn" onClick={handleClose}>
            <CloseSVG />
          </button>
        </div>

        <div className="drawer-form1">
          <Formik
            initialValues={initialValues || defaultValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values)}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <FormikForm className="drawer-body">
                <Row className="g-3">
                  <Col xs={6} md={6}>
                    <Form.Label>Master Group</Form.Label>
                    <Field
                      as="select"
                      name="masterGroup"
                      className="form-control"
                    >
                      <option>--Select--</option>
                      {masterGroup.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </Field>
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>Category</Form.Label>
                    <Field as="select" name="category" className="form-control">
                      <option>--Select--</option>
                      {categories.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </Field>
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>Group Name</Form.Label>
                    <Field as="select" name="group" className="form-control">
                      <option>--Select--</option>
                      {groupNames.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </Field>
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>Department</Form.Label>
                    <Field
                      as="select"
                      name="department"
                      className="form-control"
                    >
                      <option>--Select--</option>
                      {departments.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </Field>
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>Item Code</Form.Label>
                    <Field
                      name="itemCode"
                      className={`form-control ${
                        touched.itemCode && errors.itemCode ? "is-invalid" : ""
                      }`}
                    />
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>Item Name</Form.Label>
                    <Field
                      name="itemName"
                      className={`form-control ${
                        touched.itemName && errors.itemName ? "is-invalid" : ""
                      }`}
                    />
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>Rate</Form.Label>
                    <Field
                      name="rate"
                      className={`form-control ${
                        touched.rate && errors.rate ? "is-invalid" : ""
                      }`}
                    />
                  </Col>

                  <Col xs={6} md={6}>
                    <Form.Label>RS Rate</Form.Label>
                    <Field
                      name="rsRate"
                      className={`form-control ${
                        touched.rsRate && errors.rsRate ? "is-invalid" : ""
                      }`}
                    />
                  </Col>

                  <Col xs={6} md={6}>
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

                  <Col xs={6} md={6}>
                    <Form.Label>UOM</Form.Label>
                    <Field as="select" name="uom" className="form-control">
                      <option>--Select--</option>
                      {UOM.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </Field>
                  </Col>

                  <Col xs={6} md={6}>
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

                  <Col xs={6} md={6}>
                    <Form.Label>Status</Form.Label>
                    <Field as="select" name="status" className="form-control">
                      <option>Active</option>
                      <option>Inactive</option>
                    </Field>
                  </Col>
                </Row>

                <div className="drawer-footer">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-filter"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-create">
                    {isEditMode ? "Update" : "Create"}
                  </button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateItemForm;
