import React, {useState} from 'react';
import style from "./Table.module.scss";
import {addTaskAC, changeCategoryAC, deleteBoardAC, saveTitleTableAC} from "../../Redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../Task/Task";

export const Table = (props) => {
    const allTasks = useSelector(state => state.tables)
    const dispatch = useDispatch()

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e, cat) => {
        let id = e.dataTransfer.getData("id");

        let tasks = allTasks.tasks.filter((task) => {
            if (task.id === id) {
                task.category = cat;
            }
            return task;
        });
        dispatch(changeCategoryAC(tasks))
    }

    const [value, setValue] = useState('')

    const onChangeTitleNewTask = (e) => {
        setValue(e.currentTarget.value)
    }

    const createTask = (cat) => {
        const name = value
        const category = cat
        if (name) {
            dispatch(addTaskAC(name, category))
            setValue('')
        }
    }

    const deleteBoard =(category)=>{
        dispatch(deleteBoardAC(category))
    }
    const [isEditTitleValue, setIsEditTitleValue] = useState(false)

    const [titleValue, setTitleValue] = useState(props.title)

    const changeTitleValue = (e) => {
        setTitleValue(e.currentTarget.value)
    }

    const isEditTitle =() => {
        setIsEditTitleValue(true)
    }

    const saveTitle =(oldTitle) => {
        setIsEditTitleValue(false)
        dispatch(saveTitleTableAC(oldTitle,titleValue))
    }

    return (
            <div className={style.board}
                 onDragOver={(e) => onDragOver(e)}
                 onDrop={(e) => {onDrop(e, props.title)}}
            >
                <div className={style.taskHeader}>
                    {/*<span>{props.title}</span>*/}
                    {isEditTitleValue===true
                        ?<div className={style.taskHeader}><input value={titleValue} onChange={changeTitleValue}/><button onClick={()=>saveTitle(props.title)}>✔</button></div>
                        :<div className={style.taskHeader}><span >{titleValue}</span><button onClick={()=>isEditTitle()}>🖊️</button></div>
                    }

                    <button onClick={() => deleteBoard(props.title)}>Delete table</button>
                </div>

                <input className={style.inputNewTask} onChange={onChangeTitleNewTask} value={value}/>
                <button onClick={() => createTask(props.title)}>Create task</button>
                <div className={style.tasksContainer}>
                    <Task category={props.title}/>
                </div>
            </div>
    );
};

