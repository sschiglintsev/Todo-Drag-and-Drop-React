import React, {useState} from 'react';
import style from './Modal.module.css'
import {useDispatch} from "react-redux";
import {saveDescriptionsTaskAC, saveTitleTaskAC} from "../../Redux/tasksReducer";

export const Modal = ({isVisible = false, title, descriptions, onClose, id}) => {
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
            </div>
        </div>
    );
};