import {ethers} from "ethers"
import { TasksContractAddress } from '../config/config'
import TasksContract from "../utils/TasksContract.json"


export const getMyTasks = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const tasksContract = new ethers.Contract(TasksContractAddress, TasksContract.abi, signer)
    const allTasks = await tasksContract.getMyTasks();
    return allTasks;
}
export const createTask = async (taskTitle, taskDescription) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const tasksContract = new ethers.Contract(TasksContractAddress, TasksContract.abi, signer)
    const created = await tasksContract.createTask(taskTitle, taskDescription)
  }

export const deleteTask = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const tasksContract = new ethers.Contract(TasksContractAddress, TasksContract.abi, signer)
    await tasksContract.deleteTask(id, true)
  }

export const toggleDone = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const tasksContract = new ethers.Contract(TasksContractAddress, TasksContract.abi, signer)
    await tasksContract.toggleDone(id)

}