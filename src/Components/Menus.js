import React from 'react';
import { Card, CardBody } from 'reactstrap';
import ShowData from './ShowData';
import Scrollbars from 'react-custom-scrollbars';
const Menus = () => {
    return (
        <>
            <Scrollbars
                style={{ width: '100%', height: '100%', border: '1.5px solid #ccc', borderRadius: '4px', marginLeft: "2%" }}
            >
                <div className='menu-bar'>
                    <h4 className='text-center'>Dashboard</h4>
                    <div className='divider'></div>
                    <div style={{ maxHeight: 'calc(100% - 50px)', overflow: 'auto' }}>
                        <ShowData />
                    </div>
                </div>
            </Scrollbars>
        </>
    );
}
export default Menus;
