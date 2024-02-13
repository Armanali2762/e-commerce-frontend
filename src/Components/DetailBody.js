import React, { useEffect, useState } from 'react';
import { useGlobals } from './globals.';
import { Card, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import Base_URL from '../Api/Base_URL';

const DetailBody = () => {
    const [colour, setColour] = useState({});
    const [bridge, setBridge] = useState({});
    const [colorCheckboxes, setColorCheckboxes] = useState(null);
    const [bridgeCheckboxes, setBridgeCheckboxes] = useState([]);
    const [qtyValueInput, setQtyValueInput] = useState(null);
    const [qtyValue, setQtyValue] = useState(""); // State to store the quantity value
    const [productValue, setProductValue] = useState(""); // State to store the product value
    const { globalProduct } = useGlobals();
    const { setGlobalConfirmProduct } = useGlobals();
    const { setGSelectColor } = useGlobals();
    const { setGBridge } = useGlobals();
    const { setGQty } = useGlobals();
    const { setGValue } = useGlobals();
    // Fetch color details for the selected product
    const getColorOfProduct = (id) => {
        axios.get(`${Base_URL}/color/${id}`)
            .then((response) => {
                console.log("API Response Data (Color):", response.data);
                if (response.data.length > 0) {
                    const firstColor = response.data[0];
                    setColour({
                        vc_cust_code: firstColor.vc_cust_code || "",
                        nu_color_id: firstColor.nu_color_id || "",
                        vc_color: firstColor.vc_color || ""
                    });
                    // Assuming you have a price value in your color object, set it here
                    setProductValue(firstColor.price || "");
                }
            })
            .catch((error) => {
                console.log("Error fetching color data:", error);
            });
    };

    // Fetch bridge details for the selected product
    const getBridgeOfProduct = (id) => {
        axios.get(`${Base_URL}/bridge/${id}`)
            .then((response) => {
                console.log("API Response Data (Bridge):", response.data);
                if (response.data.length > 0) {
                    const firstBridge = response.data[0];
                    setBridge({
                        vc_cust_code: firstBridge.vc_cust_code || "",
                        nu_id: firstBridge.nu_id || "",
                        nu_size_id: firstBridge.nu_size_id || "",
                        nu_Colour_id: firstBridge.nu_Colour_id || "",
                        Chest: firstBridge.vc_Chest || "",
                        Hip: firstBridge.vc_Hip || "",
                        Waist: firstBridge.vc_Waist || "",
                        Neck: firstBridge.vc_Neck || ""
                    });
                }
            })
            .catch((error) => {
                console.log("Error fetching bridge data:", error);
            });
    };

    useEffect(() => {
        if (globalProduct !== null) {
            getBridgeOfProduct(globalProduct.nu_id);
        }
    }, [globalProduct]);

    useEffect(() => {
        if (bridge.nu_Colour_id) {
            getColorOfProduct(bridge.nu_Colour_id);
        }
    }, [bridge]);

    useEffect(() => {
        if (colour.vc_color) {
            const colorCheckboxList = (
                <FormGroup check key={colour.vc_color}>
                    <Label check className="checkbox-label">
                        <Input type="checkbox" /> {colour.vc_color}
                    </Label>
                </FormGroup>
            );
            setColorCheckboxes(colorCheckboxList);
        }
    }, [colour]);

    useEffect(() => {
        const bridgeCheckboxesList = Object.entries(bridge).map(([key, value], index) => {
            if (key === 'Hip' || key === 'Chest' || key === 'Waist' || key === 'Neck') {
                return (
                    <FormGroup check key={key}>
                        <Label check className="checkbox-label">
                            {key}:&nbsp;{value}
                        </Label>
                    </FormGroup>
                );
            }
            return null;
        });

        setBridgeCheckboxes(bridgeCheckboxesList.filter(Boolean)); // Filter out null values
    }, [bridge]);

    const handleOrderClick = () => {
        if (globalProduct === null) {
            alert("Please Select Product !!")
        } else {
            setGSelectColor(colour.vc_color);
            setGBridge(bridge);
            setGQty(qtyValue); // Set the quantity value
            setGlobalConfirmProduct(true);
            setGValue(productValue)
        }
    };

    const handleQtyChange = (e) => {
        const { value } = e.target;
        setQtyValue(value);
        // Calculate and update the product value based on the quantity
        const newValue = calculateProductValue(value);
        setProductValue(newValue);
    };

    const calculateProductValue = (qty) => {
        // You can implement your logic here to calculate the product value based on the quantity
        // For simplicity, let's assume the product value is twice the quantity
        return parseInt(qty, 10) * 250;
    };

    useEffect(() => {
        if (globalProduct) {
            const qtyValueInputBlock = (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    <div className="qty-label">Qty:&nbsp;</div>
                    <Input type="number" title='Enter QTY' id='qty' placeholder='QTY' style={{ marginLeft: '10px', width: '80px' }} value={qtyValue} onChange={handleQtyChange} />
                    <div className="value-label">Value:&nbsp;</div>
                    <Input type="text" id='value' placeholder='Value' style={{ marginLeft: '10px', width: '80px' }} value={productValue} readOnly />
                </div>
            );
            setQtyValueInput(qtyValueInputBlock);
        } else {
            setQtyValueInput(null);
        }
    }, [globalProduct, qtyValue, productValue]); // Update useEffect dependencies

    return (
        <>
            <Card className='productdetail'>
                <CardBody>
                    <h4 className='text-center'>Product Name: {
                        globalProduct === null ? (
                            <h5>Selected Product</h5>
                        ) : (
                            globalProduct.vc_cloth_code
                        )
                    } </h4>
                    <div className='divider'></div>

                    <div className="detail-row">
                        {colorCheckboxes}
                        {bridgeCheckboxes}
                        {qtyValueInput}
                    </div>

                    <div className='order-menu mb-3'>
                        <div style={{ display: 'flex' }} className='mt-2'>
                            <Button color='warning' id="total-price" onClick={handleOrderClick}>Order</Button>
                        </div>
                    </div>
                </CardBody>
            </Card >
        </>
    )
}

export default DetailBody;
