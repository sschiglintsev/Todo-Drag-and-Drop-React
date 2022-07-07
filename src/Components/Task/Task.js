import React from 'react';
import style from "../../App.module.scss"
import {deleteTaskAC} from "../../Redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {SetModal} from "../common/SetModal";

export const Task = (props) => {
    const allTasks = useSelector(state => state.tables)
    const dispatch = useDispatch()

    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    const deleteTask = (id) => {
        dispatch(deleteTaskAC(id))
    }

    let table = {
        tasksArray: []
    }

    allTasks.tasks.filter(el => el.category === props.category).forEach((t) => {
        table.tasksArray.push(
            <div key={t.id}
                 className={style.draggable}
                 onDragStart={(e) => onDragStart(e, t.id)}
                 draggable
                 style={{
                     width: "100px",
                     height: "150px",
                     backgroundColor: "yellow",
                     margin: "5px auto",
                     cursor: "grab"
                 }}
            >
                {t.name}
                <div>
                    Descriptions
                    <div>
                        {t.descriptions}
                    </div>
                </div>

                <SetModal title={t.name} id={t.id} descriptions={t.descriptions} microTasks={t.microTasks}/>
                <div>
                    <button onClick={() => deleteTask(t.id)}>delete</button>
                </div>
            </div>
        );
    });

    return (
        <>
            {table.tasksArray}
        </>
    );
};
