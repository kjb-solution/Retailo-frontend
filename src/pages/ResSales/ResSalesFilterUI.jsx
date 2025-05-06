import { X } from "lucide-react";
import React from "react";
import { Form, Button } from "react-bootstrap";

function ResSalesFilterUI({
  filters,
  setFilters,
  setShowFilter,
  handleApplyFilter,
  handleClearFilter,
  handleInputChange,
  payModeOptions,
  entityNameOptions,
  postFromOptions,
  departmentOptions,
}) {
  return (
    <>
      <div className="filter-content">
        <div className="filter-header">
          <h5>Filters</h5>
          <X
            size={24}
            onClick={() => setShowFilter(false)}
            className="close-icon"
          />
        </div>
        <hr />
        <div className="filter-form">
          <div className="filter-form-fields">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-form-fields">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-form-fields">
            <Form.Label>Bill No</Form.Label>
            <Form.Control
              type="text"
              name="billNo"
              value={filters.billNo}
              onChange={handleInputChange}
              placeholder="Search Bill No"
            />
          </div>
          <div className="filter-form-fields">
            <Form.Label>Room No</Form.Label>
            <Form.Control
              type="text"
              name="rmNo"
              value={filters.rmNo}
              onChange={handleInputChange}
              placeholder="Search Room No"
            />
          </div>
          <div className="filter-form-fields">
            <Form.Label>Table No</Form.Label>
            <Form.Control
              type="text"
              name="tableNo"
              value={filters.tableNo}
              onChange={handleInputChange}
              placeholder="Search Table No"
            />
          </div>
          <div className="filter-form-fields">
            <Form.Label>Bill Type</Form.Label>
            <Form.Select
              name="billType"
              value={filters.billType}
              onChange={handleInputChange}
            >
              <option value="">Select Bill Type</option>
              <option value="RF">RF</option>
              <option value="RSF">RSF</option>
            </Form.Select>
          </div>
          <div className="filter-form-fields">
            <Form.Label>Pay Mode</Form.Label>
            <Form.Select
              name="pMode"
              value={filters.pMode}
              onChange={handleInputChange}
            >
              <option value="">Select Pay Mode</option>
              {payModeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="filter-form-fields">
            <Form.Label>Entity Name</Form.Label>
            <Form.Select
              name="entityName"
              value={filters.entityName}
              onChange={handleInputChange}
            >
              <option value="">Select Entity Name</option>
              {entityNameOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="filter-form-fields">
            <Form.Label>Post From</Form.Label>
            <Form.Select
              name="postFrom"
              value={filters.postFrom}
              onChange={handleInputChange}
            >
              <option value="">Select Post From</option>
              {postFromOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="filter-form-fields">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={filters.department}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              {departmentOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="filter-form-fields">
            <Form.Label>Bill Status</Form.Label>
            <Form.Select
              name="billStatus"
              value={filters.billStatus}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </Form.Select>
          </div>
          <div className="filter-form-fields">
            <Form.Label>ST Name</Form.Label>
            <Form.Control
              type="text"
              name="stName"
              value={filters.stName}
              onChange={handleInputChange}
              placeholder="Search ST Name"
            />
          </div>
          <div className="filter-buttons">
            <button className="theme-exit-btn" onClick={handleClearFilter}>
              Clear Filter
            </button>
            <button className="theme-btn" onClick={handleApplyFilter}>
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResSalesFilterUI;
