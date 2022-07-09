import { useState, useEffect } from 'react'
import Head from 'next/head'
import NotConnected from '../components/NotConnected'

//Icons
import { IoWalletOutline } from "react-icons/io5"
import { BiTask } from "react-icons/bi"
//CSS
import styles from "../styles/Task.module.css"
import Card from '../components/Card'


//Funtions
import { createTask, deleteTask, getMyTasks } from "../functions/TaskFunctions"
import NoProvider from '../components/NoProvider'
const Home = () => {

  const [isThereProvider, setIsThereProvider] = useState(false)
  const [isloggedIn, setIsloggedIn] = useState(false)
  const [address, setAddress] = useState("Connect Wallet")
  const [tasks, setTasks] = useState([])
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (window.ethereum) {
      connectWalletHandler();
    } else {
      console.log("Please download metamask...")
      setIsThereProvider(true)
    }
  }, [])

  let web3Provider = ""
  const connectWalletHandler = async () => {

    if (window.ethereum) {
      try {
        web3Provider = window.ethereum
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (web3Provider.selectedAddress !== null) {
          setIsloggedIn(true)
          setAddress(web3Provider.selectedAddress)
          getAllTasks()
        }
      } catch (error) {
        if (error.code === 4001) {
          console.log("User Rejected Connection")
        }
      }
    } else {
      console.log("metamask is not installed...")
    }
  }



  let shortAddress;
  if (address === "Connect Wallet") {
    shortAddress = address;
  } else {
    let replacement = address.slice(0, 6) + "..." + address.slice(address.length - 4);
    shortAddress = address.replace(address, replacement);
  }

  const getAllTasks = () => {
    setLoading(true)
    getMyTasks().then((res) => {
      console.log(res)
      setLoading(false)
      setTasks(res)
    })

  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, taskTitle: e.target.value })
  }

  const handleTextChange = (e) => {
    setFormData({ ...formData, taskDescription: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(formData.taskTitle, formData.taskDescription)
  }
  const handleDelete = async (taskId) => {
    deleteTask(taskId).then(() => getAllTasks())
  }

  return (
    <>
      <Head>
        <title>Tasky App</title>
        <meta name="description" content="blockchain tasks app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
        {isThereProvider ? <NoProvider /> :
          <>
            {isloggedIn ? <>
              <div className={styles.container}>
                <div>
                  <div className={styles.userInfoContainer}>
                    <div className={styles.infoHead}>
                      <div className={styles.infoLogo}>
                        <IoWalletOutline size={30} />
                        <h2>TASKY (BUGS)</h2>
                      </div>
                      <p>Decentralized task app 😊</p>
                    </div>
                    <div className={styles.infoWallet}>
                      {/* <IoWalletOutline size={20} /> */}

                      <h3>Wallet:</h3>
                      <p>{isloggedIn ? shortAddress : "Connect Wallet"}</p>
                    </div>
                    <button className={styles.btnConnect} onClick={connectWalletHandler}>{isloggedIn ? "Connected" : "Connect Wallet"}</button>

                  </div>
                  <div className={styles.formContainer}>
                    <h2 className={styles.title}>Add a Task</h2>
                    <form onSubmit={handleSubmit}>
                      <input type="text" placeholder=' Write a task' onChange={handleInputChange} value={formData.taskTitle} />
                      <textarea cols="30" rows="10" placeholder='Gotta do...' onChange={handleTextChange} value={formData.taskDescription}></textarea>
                      <button type="submit" className={styles.btnSave}>Save</button>
                    </form>
                  </div>
                </div>
                <div className={styles.tasksContainer}>
                  {loading ? "Loading" :
                    <>
                      {tasks && tasks.map((task, index) => {
                        return (
                          <Card key={index}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            done={task.done}
                            createdat={parseInt(task.createdAt)}
                            deletetask={(taskId) => handleDelete(taskId)}
                          />
                        )
                      })
                      }
                    </>}
                </div>
              </div>
            </>
              :
              <>
                <div className={styles.container}>

                  <NotConnected connectWalletHandler={connectWalletHandler} />
                </div>
              </>

            }
          </>
        }
      </main>


    </>
  )
}

export default Home;