import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCustomerTypeData = () => axios.get(`${API_BASE_URL}/customer-type`);
export const fetchAccountIndustryData = () => axios.get(`${API_BASE_URL}/account-industry`);
export const fetchTeamData = () => axios.get(`${API_BASE_URL}/team`);
export const fetchProductLineData = () => axios.get(`${API_BASE_URL}/product-line`);
