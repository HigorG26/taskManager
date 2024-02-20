import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'

//CSS
import style from '../styles/TaskForm.module.css'

//INTERFACE
import { ITask } from '../interfaces/Task'

interface Props {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?: ITask | null;
    handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaksForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        if (task) {
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (handleUpdate) {
            handleUpdate(id, title, difficulty)
        } else {
            const id = Math.floor(Math.random() * 1000)
            const newTask: ITask = { id, title, difficulty }
            setTaskList!([...taskList, newTask])
            setTitle("")
            setDifficulty(0)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        if (e.target.name === 'difficulty') {
            setDifficulty(parseInt(e.target.value))
        }
        else {
            return null;
        }

    }

    return (
        <form onSubmit={addTaskHandler} className={style.form}>
            <div className={style.input_container}>
                <label htmlFor='title'>Título: </label>
                <input type="text" name='title' placeholder='Título da tarefa.' onChange={handleChange} value={title} />
            </div>
            <div className={style.input_container}>
                <label htmlFor='difficulty'>Dificuldade: </label>
                <input type="text" name='difficulty' placeholder='Dificuldade da tarefa.' onChange={handleChange} value={difficulty} />
            </div>
            <input type='submit' value={btnText} />
        </form>
    )
}

export default TaksForm
