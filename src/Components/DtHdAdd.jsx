import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useGlobals } from "./globals.";

const DtHdAdd = () => {
  const [hdData, setHdData] = useState({
    purchaseOrder: "",
    purchaseOrderDate: "",
    totalValue: "",
    totalItems: "",
  });

  const { globalAddProduct, setGlobalAddProduct } = useGlobals();

  const formattedHdData = {
    ...hdData,
    intPurchaseOrderNo: parseInt(hdData.purchaseOrder, 10),
    dtPurchaseOrderDate: new Date(hdData.purchaseOrderDate),
    dcTotalValue: parseFloat(hdData.totalValue),
    intTotalItems: parseInt(hdData.totalItems, 10),
  };

  const postdatahd = () => {
    const hdUrl = "http://localhost:8080/HdInsert";

    axios
      .post(hdUrl, formattedHdData)
      .then((response) => {
        console.log(response.data);
        alert("Data Inserted Successfully !!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  const [dtData, setDtData] = useState([
    { nuItemId: "", intQty: "", dcPrice: "" },
  ]);

  const formattedDtData = dtData.map((dtItem) => ({
    ...dtItem,
    nuItemId: parseInt(dtItem.nuItemId, 10),
    intQty: parseInt(dtItem.intQty, 10),
    dcPrice: parseFloat(dtItem.dcPrice),
  }));

  const postdatadt = () => {
    const dtUrl = "http://localhost:8080/DtInsert";

    formattedDtData.forEach((formattedItem) => {
      axios
        .post(dtUrl, formattedItem)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  const handleDataSubmit = () => {
    postdatahd();
    postdatadt();
  };

  const handleInputChange = (key, value) => {
    setHdData({ ...hdData, [key]: value });
  };

  const handleDtInputChange = (index, key, value) => {
    const updatedDtData = [...dtData];
    updatedDtData[index][key] = value;
    setDtData(updatedDtData);
  };

  //for the Show Home Page
  const handleAddProduct = ()=> {
    setGlobalAddProduct(false);
  }

  const handleAddRow = () => {
    setDtData([...dtData, { nuItemId: "", intQty: "", dcPrice: "" }]);
  };

  const handleDeleteRow = (index) => {
    const updatedDtData = [...dtData];
    updatedDtData.splice(index, 1);
    setDtData(updatedDtData);
  };

  return (
    <div className="full-screen-container">
      {/* HD Items */}
      <table className="purchase-order-table">
        <thead>
          <tr>
            <th>Purchase Order No</th>
            <th>Purchase Order Date</th>
            <th>Total Items</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Enter Purchase Order No"
                value={hdData.purchaseOrder}
                onChange={(e) =>
                  handleInputChange("purchaseOrder", e.target.value)
                }
                required
              />
            </td>
            <td>
              <input
                type="date"
                placeholder="Enter Purchase Order Date"
                value={hdData.purchaseOrderDate}
                onChange={(e) =>
                  handleInputChange("purchaseOrderDate", e.target.value)
                }
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter Total Items"
                value={hdData.totalItems}
                onChange={(e) =>
                  handleInputChange("totalItems", e.target.value)
                }
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter Total Value"
                value={hdData.totalValue}
                onChange={(e) =>
                  handleInputChange("totalValue", e.target.value)
                }
                required
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* DT Items */}
      <table className="purchase-order-table">
        <thead>
          <tr>
            <th>Item Id</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dtData.map((dtItem, index) => (
            <tr key={index}>
              {Object.keys(dtItem).map((key, innerIndex) => (
                <td key={innerIndex}>
                  <input
                    type="text"
                    placeholder={`Enter ${key}`}
                    value={dtItem[key]}
                    onChange={(e) =>
                      handleDtInputChange(index, key, e.target.value)
                    }
                    required
                  />
                </td>
              ))}
              <td>
                <Button variant="success" size="sm" onClick={handleAddRow}>
                  +
                </Button>{" "}
                {index > 0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteRow(index)}
                  >
                    -
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <Button type="button" onClick={handleDataSubmit}>
          ADD_ITEMS
        </Button>
        <Button type="button" className="ml-5" onClick={handleAddProduct}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default DtHdAdd;
