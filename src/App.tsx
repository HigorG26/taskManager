import React, { useState } from 'react';
//css
import style from '../src/styles/Main.module.css'

//components
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import TaksForm from './components/TaksForm';
import TaskList from './components/TaskList';

//INTERFACE
import { ITask } from './interfaces/Task';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTaks = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    )
  }

  const showModal = (display: boolean) => {
    const modal = document.querySelector('#modal')
    if (display) {
      modal!.classList.remove('hide')
    } else {
      modal!.classList.add('hide')
    }
  }

  const editTask = (task: ITask) => {
    showModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty }

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)

    showModal(false)
  }

  return (
    <div>
      <Modal children={
        <TaksForm
          btnText='Editar'
          taskList={taskList}
          task={taskToUpdate}
          handleUpdate={updateTask}
        />}
      />
      <Header />
      <main className={style.main}>
        <div>
          <h2 className='text-xl underline'>O que você vai fazer?</h2>
          <TaksForm
            btnText='Criar tarefa'
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <hr className='h-px max-w-96 mx-auto mb-3 bg-black border-2 border-black' />
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTaks} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
