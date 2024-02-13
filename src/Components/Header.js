import React from 'react';
import './customstyle.css';
import { Card, CardBody } from 'reactstrap';
const Header = () => {
    return (
        <>
            <Card>
                <CardBody>
                    <div className='header'>
                        <div>
                            <h2 className='mt-1'>Moradabad Store</h2>
                        </div>
                        <div className='logo'>
                            
                        </div>
                        <div>
                            <h2 className='mt-1'>E-Commerce Site</h2>
                        </div>
                        
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
export default Header;