import {v1} from 'uuid';

const initialState = {
    category: ["wip", "complete"],
    tasks: [
        {
            id: v1(), name: "Learn Angular", descriptions: "Angular", category: "wip",
            microTasks: [{microTaskId: v1(), microTaskTitle: 'TaskAngular'},
                {microTaskId: v1(), microTaskTitle: 'TaskLearn'}]
        },
        {
            id: v1(), name: "React", descriptions: "React", category: "wip",
            microTasks: [{microTaskId: v1(), microTaskTitle: 'TaskReact'}]
        },
        {
            id: v1(), name: "Vue", descriptions: "Vue", category: "complete",
            microTasks: [{microTaskId: v1(), microTaskTitle: 'TaskVue'}]
        }
    ]
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                name: action.payload.name,
                category: action.payload.category,
                microTasks: []
            }
            return {...state, tasks: [...state.tasks, newTask]}
        case 'ADD-MICRO-TASK':
            const newMicroTask = {
                microTaskId: v1(),
                microTaskTitle: action.payload.title,
            }
            return {
                ...state, tasks: state.tasks.map(el => {
                    if (el.id === action.payload.id) {
                        return {...el, microTasks: [...el.microTasks, newMicroTask]}
                    } else {
                        return el
                    }
                })
            }
        case 'DELETE-MICRO-TASK':
            return {
                ...state, tasks: state.tasks.map(el => {
                    if (el.id === action.payload.idTask) {
                        return {...el, microTasks: el.microTasks.filter(e=> e.microTaskId !== action.payload.idMicroTask)}
                    } else {
                        return el
                    }
                })
            }
        case 'DELETE-TASK':
            return {...state, tasks: state.tasks.filter(el => el.id !== action.payload.id)}
        case 'CHANGE-CATEGORY':
            return {...state, tasks: action.payload.tasks}
        case 'ADD-TABLE':
            return {...state, category: [...state.category, action.payload.title]}
        case  'CLEAR-ALL':
            return {...state, category: [], tasks: []}
        case 'DELETE-BOARD':
            return {
                ...state,
                category: state.category.filter(el => el !== action.payload.category),
                tasks: state.tasks.filter(el => el.category !== action.payload.category)
            }
        case 'SAVE-TITLE-TASK':
            return {
                ...state, tasks: state.tasks.map(el => {
                    if (el.id === action.payload.id) {
                        return {...el, name: action.payload.title}
                    } else {
                        return el
                    }
                })
            }
        case 'SAVE-DESCRIPTIONS-TASK':
            return {
                ...state, tasks: state.tasks.map(el => {
                    if (el.id === action.payload.id) {
                        return {...el, descriptions: action.payload.descriptions}
                    } else {
                        return el
                    }
                })
            }
        case 'SAVE-TITLE-TABLE':
            return {
                ...state,
                category: state.category.map(el => {
                    if (el === action.payload.oldTitle) {
                        return action.payload.category
                    } else {
                        return el
                    }
                }),
                tasks: state.tasks.map(el => {
                    if (el.category === action.payload.oldTitle) {
                        return {...el, category: action.payload.title}
                    } else {
                        return el
                    }
                })
            }
        default:
            return state
    }
}

export const addTaskAC = (name, category) => ({
    type: 'ADD-TASK',
    payload: {
        name,
        category,
    }
})

export const addMicroTaskAC = (id, title) => ({
    type: 'ADD-MICRO-TASK',
    payload: {
        id,
        title,
    }
})

export const deleteTaskAC = (id) => ({
    type: 'DELETE-TASK',
    payload: {
        id
    }
})

export const deleteMicroTaskAC = (idTask, idMicroTask) => ({
    type: 'DELETE-MICRO-TASK',
    payload: {
        idTask,
        idMicroTask
    }
})

export const changeCategoryAC = (tasks) => ({
    type: 'CHANGE-CATEGORY',
    payload: {
        tasks
    }
})
export const addTableAC = (title) => ({
    type: 'ADD-TABLE',
    payload: {
        title
    }
})

export const clearAllAC = () => ({
    type: 'CLEAR-ALL',
})

export const deleteBoardAC = (category) => ({
    type: 'DELETE-BOARD',
    payload: {
        category
    }
})
export const saveTitleTaskAC = (id, title) => ({
    type: 'SAVE-TITLE-TASK',
    payload: {
        id,
        title
    }
})

export const saveDescriptionsTaskAC = (id, descriptions) => ({
    type: 'SAVE-DESCRIPTIONS-TASK',
    payload: {
        id,
        descriptions
    }
})

export const saveTitleTableAC = (oldTitle, category) => ({
    type: 'SAVE-TITLE-TABLE',
    payload: {
        oldTitle,
        category
    }
})



