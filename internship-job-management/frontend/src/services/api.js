import axios from 'axios';
import { USER_API_END_POINT, JOB_API_END_POINT, APPLICATION_API_END_POINT, COMPANY_API_END_POINT } from '../utils/constant';

// Axios instance with default config
const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ============== USER APIs ==============
export const registerUser = async (userData) => {
    return await api.post(`${USER_API_END_POINT}/register`, userData);
};

export const loginUser = async (credentials) => {
    return await api.post(`${USER_API_END_POINT}/login`, credentials);
};

export const logoutUser = async () => {
    return await api.get(`${USER_API_END_POINT}/logout`);
};

export const updateProfile = async (profileData) => {
    return await api.post(`${USER_API_END_POINT}/profile/update`, profileData);
};

// ============== JOB APIs ==============
export const getAllJobs = async (searchQuery = '') => {
    const url = searchQuery
        ? `${JOB_API_END_POINT}/get?keyword=${searchQuery}`
        : `${JOB_API_END_POINT}/get`;
    return await api.get(url);
};

export const getJobById = async (jobId) => {
    return await api.get(`${JOB_API_END_POINT}/get/${jobId}`);
};

export const postJob = async (jobData) => {
    return await api.post(`${JOB_API_END_POINT}/post`, jobData);
};

export const getAdminJobs = async () => {
    return await api.get(`${JOB_API_END_POINT}/getadminjobs`);
};

// ============== APPLICATION APIs ==============
export const applyToJob = async (jobId) => {
    return await api.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`);
};

export const getAppliedJobs = async () => {
    return await api.get(`${APPLICATION_API_END_POINT}/get`);
};

export const getApplicants = async (jobId) => {
    return await api.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`);
};

export const updateApplicationStatus = async (applicationId, status) => {
    return await api.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status });
};

// ============== COMPANY APIs ==============
export const registerCompany = async (companyData) => {
    return await api.post(`${COMPANY_API_END_POINT}/register`, companyData);
};

export const getCompanies = async () => {
    return await api.get(`${COMPANY_API_END_POINT}/get`);
};

export const getCompanyById = async (companyId) => {
    return await api.get(`${COMPANY_API_END_POINT}/get/${companyId}`);
};

export const updateCompany = async (companyId, companyData) => {
    return await api.put(`${COMPANY_API_END_POINT}/update/${companyId}`, companyData);
};

export default api;
