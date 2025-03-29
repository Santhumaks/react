import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/example/";
const project_url= "http://127.0.0.1:8000/api/project/";
export const getAllRecords = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getRecordById = async (id:any) => {
    const response = await axios.get(`${API_BASE_URL}${id}/`);
    return response.data;
};

export const createRecord = async (data:any) => {
    const response = await axios.post(`${API_BASE_URL}create/`, data);
    return response.data;
};

export const updateRecord = async (id:any, data:any) => {
    const response = await axios.put(`${API_BASE_URL}update/${id}/`, data);
    return response.data;
};

export const softDeleteRecord = async (id:any) => {
    const response = await axios.patch(`http://127.0.0.1:8000/api/records/${id}/soft-delete/`);
    return response.data;
};
export const getProjectsByUserId = async (id:any) => {
    const response = await axios.get(`${project_url}user/${id}/`);
    return response.data;
};
export const addNewProject = async (data:any) => {
    const response = await axios.post(`${project_url}create/`, data);
    return response.data;
};
export const getAllProjects = async () => {
    const response = await axios.get(project_url);
    return response.data;
};
export const softDeleteProject = async (id:any,st:string) => {
    const response = await axios.patch(`http://127.0.0.1:8000/api/project/${id}/${st}/soft-delete/`);
    return response.data;
};