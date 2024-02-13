import React, { useState } from 'react';
import { GlobalProvider, useGlobals } from './globals.';
import Header from './Header';
import Categories from './Categories';
import Menus from './Menus';
import DetailBody from './DetailBody';
import { Col, Row, Input, Button, Label } from 'reactstrap';
import DtHdAdd from './DtHdAdd';
import ConfirmOrder from './ConfirmOrder';

const MainHeader = () => {
    return (
        <GlobalProvider>
            <MainHeaderContent />
        </GlobalProvider>
    );
};

const MainHeaderContent = () => {
    const { globalAddProduct, setGlobalAddProduct } = useGlobals();
    const { globalConfirmProduct } = useGlobals();
    const [showQueryInput, setShowQueryInput] = useState(false);
    const [query, setQuery] = useState('');

    const handleAddProduct = () => {
        setGlobalAddProduct(true);
    };

    const handleYesClick = () => {
        setShowQueryInput(true);
    };

    const handleNoClick = () => {
        setShowQueryInput(false);
    };

    const handleSubmitQuery = () => {
        // Here you can handle the submission of the query, such as sending it to a backend server or displaying it on the console
        console.log("User query:", query);
        // Optionally, you can also clear the input field after submission
        setQuery('');
    };

    return (
        <>
            {globalAddProduct && <DtHdAdd />}
            {globalConfirmProduct && <ConfirmOrder />}
            {!globalAddProduct && !globalConfirmProduct && (
                <>
                    <Header />
                    <button className="addProduct" onClick={handleAddProduct}>Add More Product</button>
                    <Categories />
                    <Row style={{ marginTop: 30 }}>
                        <Col md='2'>
                            <Menus />
                        </Col>
                        <Col md='8'>
                            <DetailBody />
                        </Col>
                    </Row>
                    <div className="problem">
                        <Label>*Are you facing any problem?</Label>
                        <div className='mt-2'>
                            <Input type="radio" name="feedbackOption" value="Yes" onChange={(e) => handleYesClick()} /> Yes
                            <Input type="radio" name="feedbackOption" value="No" onChange={(e) => handleNoClick()} /> No
                        </div>
                    </div>
                    {showQueryInput && (
                        <div className="query-input">
                            <Input type="textarea" placeholder="Type your query here" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button color="primary" className="querybutton" onClick={handleSubmitQuery}>Submit</Button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default MainHeader;
