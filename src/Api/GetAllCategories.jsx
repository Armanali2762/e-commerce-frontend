import axios from 'axios';
import React from 'react';
import Base_URL from './Base_URL';

export const GetAllCategories = () => {
    return axios.get(`${Base_URL}/all-categories`).then(response => response.data);
}