import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useGlobals } from './globals.';

const PurchaseHistory = () => {

    const { setGPurchaseHistory } = useGlobals();

    const handlePurchaseHistory = () => {
        setGPurchaseHistory(false);
    }
    const [purchaseHistory, setPurchaseHistory] = useState([
        {
            PurchaseID: 1,
            VendorID: 'VENDOR123',
            PurchaseDate: '2024-02-20',
            ProductID: 'PROD456',
            Quantity: 2,
            UnitPrice: 10.99,
            TotalPrice: 21.98
        },
        {
            PurchaseID: 2,
            VendorID: 'VENDOR123',
            PurchaseDate: '2024-02-20',
            ProductID: 'ZZNNEE902',
            Quantity: 3,
            UnitPrice: 15.99,
            TotalPrice: 47.97
        },
        {
            PurchaseID: 3,
            VendorID: 'VENDOR123',
            PurchaseDate: '2024-02-20',
            ProductID: 'XXTRO09',
            Quantity: 1,
            UnitPrice: 5.99,
            TotalPrice: 5.99
        }
        // Add more static values if needed
    ]);
    const [filteredPurchaseHistory, setFilteredPurchaseHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch purchase history data from backend API
    useEffect(() => {
        // Since we're using static data, no need to fetch from API
        setFilteredPurchaseHistory(purchaseHistory); // Initialize filtered data with all purchases
    }, [purchaseHistory]);

    // Filter purchase history based on search query for Product ID, Vendor ID, or Purchase Date
    useEffect(() => {
        const filteredData = purchaseHistory.filter(purchase =>
            purchase.ProductID.includes(searchQuery) ||
            purchase.VendorID.includes(searchQuery) ||
            purchase.PurchaseDate.includes(searchQuery)
        );
        setFilteredPurchaseHistory(filteredData);
    }, [searchQuery, purchaseHistory]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="container">
                <h2 className="text-center">Purchase History</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Product ID, Vendor ID, or Purchase Date"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Purchase ID</th>
                                <th>Vendor ID</th>
                                <th>Purchase Date</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPurchaseHistory.map((purchase) => (
                                <tr key={purchase.PurchaseID}>
                                    <td>{purchase.PurchaseID}</td>
                                    <td>{purchase.VendorID}</td>
                                    <td>{purchase.PurchaseDate}</td>
                                    <td>{purchase.ProductID}</td>
                                    <td>{purchase.Quantity}</td>
                                    <td>₹{purchase.UnitPrice.toFixed(2)}</td>
                                    <td>₹{purchase.TotalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='text-center mt-3'>
                <Button onClick={handlePurchaseHistory}>Go To Home</Button>
            </div>
        </>
    );
};

export default PurchaseHistory;