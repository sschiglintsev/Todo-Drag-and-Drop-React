import React, {useState} from 'react';
import style from './Modal.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addMicroTaskAC, deleteMicroTaskAC, saveDescriptionsTaskAC, saveTitleTaskAC} from "../../Redux/tasksReducer";
import {MicroTask} from "../Task/MicroTask/MicroTask";

export const Modal = ({isVisible = false, title, descriptions, onClose, id,microTasks}) => {
    const dispatch = useDispatch()



    const keydownHandler = ({key}) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    const [isEditTitleValue, setIsEditTitleValue] = useState(false)
    const [isEditDescriptionsValue, setIsEditDescriptionsValue] = useState(false)

    const [titleValue, setTitleValue] = useState(title)
    const [newMicroTaskTitleValue, setNewMicroTaskTitleValue] = useState('')
    const [descriptionsValue, setDescriptionsValue] = useState(descriptions)


    const isEditTitle = () => {
        setIsEditTitleValue(true)
    }

    const isEditDescriptions = () => {
        setIsEditDescriptionsValue(true)
    }

    const saveTitle = () => {
        setIsEditTitleValue(false)
        dispatch(saveTitleTaskAC(id, titleValue))
    }

    const saveDescriptions = () => {
        setIsEditDescriptionsValue(false)
        dispatch(saveDescriptionsTaskAC(id, descriptionsValue))
    }

    const changeTitleValue = (e) => {
        setTitleValue(e.currentTarget.value)
    }


    const changeDescriptionsValue = (e) => {
        setDescriptionsValue(e.currentTarget.value)
    }

    const changeMicroTaskValue = (e) => {
        setNewMicroTaskTitleValue(e.currentTarget.value)
    }

    const addMicroTask = () => {
        dispatch(addMicroTaskAC(id, newMicroTaskTitleValue))
        setNewMicroTaskTitleValue('')
    }

    const deleteMicroTask = (microTaskId) => {

        dispatch(deleteMicroTaskAC(id, microTaskId))
    }

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !isVisible ? null : (
        <div className={style.modal} onClick={onClose}>
            <div className={style.modalDialog} onClick={e => e.stopPropagation()}>
                <div className={style.modalHeader}>
                    {isEditTitleValue === true
                        ? <div className={style.modalTitle}><input value={titleValue} onChange={changeTitleValue}/>
                            <button onClick={() => saveTitle()}>✔</button>
                        </div>
                        : <div className={style.modalTitle}><span className={style.modalTitle}>{titleValue}</span>
                            <button onClick={() => isEditTitle()}>🖊️</button>
                        </div>
                    }
                    <span className={style.modalClose} onClick={onClose}> Close
                    </span>
                </div>
                <div className={style.modalBody}>
                    Descriptions:
                    {isEditDescriptionsValue === true
                        ? <div className={style.modalContent}><input value={descriptionsValue}
                                                                     onChange={changeDescriptionsValue}/>
                            <button onClick={() => saveDescriptions()}>✔</button>
                        </div>
                        : <div className={style.modalContent}><span
                            className={style.modalTitle}>{descriptionsValue}</span>
                            <button onClick={() => isEditDescriptions()}>🖊️</button>
                        </div>
                    }
                </div>
                <div>
                    MicroTasks
                    <input placeholder="title" value={newMicroTaskTitleValue}
                           onChange={changeMicroTaskValue}/>
                    <button onClick={()=>addMicroTask()}>Add microTask </button>
                    {microTasks.map(el=> {
                        return (<div key={el.microTaskId}>
                            <input type="checkbox"/>
                            {el.microTaskTitle}
                            <button onClick={()=> deleteMicroTask(el.microTaskId)} >delete microtask</button>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    );
};