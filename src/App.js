import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from './App.module.scss';
import {Table} from "./Components/Table/Table";
import {addTableAC, addTaskAC, clearAllAC} from "./Redux/tasksReducer";
import {v1} from "uuid";

export const App = () => {
    const dispatch = useDispatch()
    const category = useSelector(state => state.tables.category)

    const boards = category.map(el => {
        return <Table title={el} key={v1()}/>
    })
    const [value, setValue] = useState('')

    const onChangeTitleNewTable = (e) => {
        setValue(e.currentTarget.value)
    }

    const createTable = () => {
        const title = value
        const isCategory = category.find(el => el === title)
        if (isCategory === undefined) {
            if (title) {
                dispatch(addTableAC(title))
                setValue('')
            }
        } else {
            alert('Board with name '+ title +' exist')
        }
    }

    const clearAll = () => {
        dispatch(clearAllAC())
    }

    return (
        <div className={style.app}>
            <h2 className={style.header}>ToDo</h2>
            <button onClick={() => clearAll()}>Clear all</button>
            <div>
                <input onChange={onChangeTitleNewTable} value={value}/>
                <button onClick={() => createTable()}>Create table</button>
            </div>
            <div className={style.containerDrag}>
                {boards}
            </div>
        </div>
    )
}

