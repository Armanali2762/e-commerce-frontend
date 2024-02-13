import React from 'react';
import { Button, Card, CardBody } from 'react-bootstrap';
import { useGlobals } from './globals.';
const ConfirmOrder = () => {
    const { setGlobalConfirmProduct } = useGlobals();
    const { gSelectColor } = useGlobals();
    const { gBridge } = useGlobals();
    const { globalProduct } = useGlobals();
    const {gQty}=useGlobals();
    const {gValue}=useGlobals();
    const BackToHome = () => {
        setGlobalConfirmProduct(false);
    }
    const handleNext = ( )=> {
        alert("Your Order submitted Successfully !!")
        setGlobalConfirmProduct(false);
    }
    return (
        <>
            <Card className="Order">
                <CardBody>
                    <h2 className="text-center mt-2">Order Conformation !!</h2>
                    <div className="divider"></div>
                    <div className='mt-2'>
                        <h5 id="order-value">Product Name: <span style={{ marginLeft: '130px', fontWeight: 'bold' }}>{globalProduct.vc_cloth_code}</span></h5>
                        <h5 id="order-value">Chest: <span style={{ marginLeft: '200px', fontWeight: 'bold' }}>{gBridge.Chest}</span></h5>
                        <h5 id="order-value">Waist: <span style={{ marginLeft: '200px', fontWeight: 'bold' }}>{gBridge.Waist}</span></h5>
                        <h5 id="order-value">Neck: <span style={{ marginLeft: '200px', fontWeight: 'bold' }}>{gBridge.Neck}</span></h5>
                        <h5 id="order-value">Color: <span style={{ marginLeft: '200px', fontWeight: 'bold' }}>{gSelectColor}</span></h5>
                        <h5 id="order-value">Qty: <span style={{ marginLeft: '230px', fontWeight: 'bold' }}>{gQty}</span></h5>
                        <h5 id="order-value">Price: <span style={{ marginLeft: '200px', fontWeight: 'bold' }}>{gValue}</span></h5>
                    </div>


                    <div className='text-center mt-5'>
                        <Button onClick={BackToHome}>View</Button>
                        <Button className="buttonOrder" onClick={handleNext}>Submit</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default ConfirmOrder;