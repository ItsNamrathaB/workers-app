import axiosBaseService from "./axios-common";

const getAllWorkers = () => {
  return axiosBaseService.get(`/workers`);
};

const getWorkerDetails = (workerId) => {
  return axiosBaseService.get(`/workers/${workerId}`);
};

const createWorker = (workerData) => {
  return axiosBaseService.post(`/workers`, workerData);
};
const methods = {
  getAllWorkers,
  getWorkerDetails,
  createWorker,
};

export default methods;
