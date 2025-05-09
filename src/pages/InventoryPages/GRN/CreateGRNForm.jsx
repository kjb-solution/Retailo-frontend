import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as yup from "yup";

function CreateGRNForm() {
  return (
    <div>
      <h4>Goods Receipt Note</h4>
      <div className="GRNForm">
        <Formik>
          <FormikForm>
            <Row className="g-3">
              <h5>Information</h5>
              <Col xs={6} md={6}>
                <Form.Label>Grn No</Form.Label>
                <Field
                className="form-control"
                >

                </Field>
              </Col>
            </Row>
          </FormikForm>
        </Formik>
      </div>
    </div>
  );
}

export default CreateGRNForm;
