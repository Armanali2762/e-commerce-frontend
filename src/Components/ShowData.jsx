import React, { useEffect, useState } from 'react';
import { GetDataFromServer } from '../Api/GetDataFromServer';
import PrintData from './PrintData';
import { useGlobals } from './globals.';
const ShowData = () => {

    const { globalCategory} = useGlobals();

    const [clothes, setCloth] = useState([]);

    useEffect(() => {
        GetDataFromServer(globalCategory)
            .then((data) => {
                console.log(data);
                setCloth(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [globalCategory]);
    return (
        <>
            {clothes.length > 0 ? (
                clothes.map((currcloth) => <PrintData key={currcloth.id} cloth={currcloth} />)
            ) : (
                <h5 className='text-center mt-5'>
                    <div style={{ fontSize: '24px', transform: 'rotate(45deg)' }}>&#9650;</div>
                    Please Select Clothes Categories 
                </h5>
            )}
        </>
    );
};
export default ShowData;