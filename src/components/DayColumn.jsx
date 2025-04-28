import React, {useState, useEffect} from "react";
import {db} from "../firebase"; 
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import {motion, AnimatePresence} from "framer-motion";

// componet for each day column
const DayColumn = ({day, user}) => {
    //states for task and inputs
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [timeValue, setTimeValue] = useState(''); 
    const [editingTaskId, setEditingTaskId] = useState (null);
    const [editText, setEditText] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const isFormValid = inputValue.trim() !== ''; // check if input is not empty

    //load tasks from Firestore when day or user change
    useEffect(() => {
        const fetchTasks = async () => {
            const q = query (
                collection(db, "tasks"),
                where("user", "==", user),
                where ("day", "==", day)
            );
            const querySnapshot = await getDocs(q);
            const loadedTasks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(loadedTasks);
        };
        fetchTasks();
    }, [day, user]);
      
    
    const AddTask = async () => {
        if (inputValue.trim() === '') return;

        const newTask = {
            user,
            day,
            text:inputValue, 
            time:timeValue,
            done: false,
        };

        const docRef = await addDoc(collection(db, "tasks"), newTask);
        setTasks([...tasks, {id: docRef.id, ...newTask}]);
        setInputValue("");
        setTimeValue("");

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    const toggleDone = async (id, currentStatus) => {
        const taskRef = doc(db, "tasks", id);
        await updateDoc (taskRef, {done: !currentStatus});
        setTasks(
            tasks.map((task) =>
            task.id === id ? {...task, done: !currentStatus} : task
        )
    );
};

    const deleteTask = async (id) => {
        await deleteDoc (doc(db, "tasks", id));
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const startEdit = (task) => {
        setEditingTaskId(task.id);
        setEditText(task.text);
    };

    const saveEdit = async (id) => {
        const taskRef = doc(db, "tasks", id);
        await updateDoc (taskRef, {text: editText });
        setTasks (
            tasks.map((task) =>
                task.id === id ? {...task, text: editText } : task
            )
        );
        setEditingTaskId(null);
        setEditText("");
    };
    

    return (
        <div className=" bg-[#f3edff] 
        p-6 rounded-2xl shadow-lg w-full 
        flex flex-col transition 
        border border-[#e3d7ff]">

            <h3 className="text-xl font-bold text-center text-[#A18BFF] mb-4 ">{day}</h3>
            
            <input 
                type="text" 
                placeholder="Add task" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                className="p-3 mb-3 rounded-lg w-full  
                bg-white text-[#F7A458]  placeholder-[#F7A458] 
                focus:outline-none focus:ring-2   focus:ring-[#C8F2E0]"
            />

            <input 
                type="time"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="p-3 mb-3 rounded-lg w-full 
                bg-white text-[#F7A458] 
                focus:outline-none focus:ring-2 focus:ring-[#C8F2E0]"
                 />
                 
            {/**  Button enabled when the user inputs a task. 
             Button changes color when enabled/disabled. */}
            <button
                onClick={AddTask}
                disabled={!isFormValid}
                className={`font-bold py-2 px-4 rounded-lg border-none transition mb-4 
                    ${isFormValid 
                    ? 'bg-[#24e290] hover:bg-[#f7a458] text-white cursor-pointer' : 
                    'bg-[#C8F2E0] text-white hover:bg-[#FFE3C8] cursor-not-allowed'} 
                `} 
              > Add Task
            </button>

            {/** show user message task added */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-green-600 mt-2 font-semibold"
                    >
                    ✅ Task added successfully!
                 </motion.div>
                )}
            </AnimatePresence>

            <ul className="mt-5 space-y-4">
                {/** allow user to edit task */}
                {tasks.map((task) =>(
                    <li key={task.id} className="bg-white p-4 rounded-xl 
                    shadow flex flex-col border border-[#e0d6ff] 
                    transition hover:shadow-md ">
                        <div className="mb-2">
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="border rounded p-2 w-full 
                                    bg-white text-[#2e2e2e] 
                                    border-[#dcd1ff]"
                                />
                            ) : (
                            <p className={task.done ? "line-through text-[#b19cd9]" : 
                            "text-[#2E2E2E] "}>
                                    * {task.text} * {task.time}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 text-sm text-[#6b5bb5]">
                            <button
                                title={task.done ? "Done" : "Not done"}
                                className="border-none hover:ring-2 
                                hover:ring-[#A18BFF] 
                                focus:outline-none"
                                onClick={() => toggleDone(task.id, task.done)}>
                                    {task.done ? "✔️" : "❌" }
                            </button>

                            {editingTaskId === task.id ? (
                                 <button 
                                    title="Save"
                                    className="border-none hover:ring-2 
                                    hover:ring-[#A18BFF] focus:outline-none"
                                    onClick={() =>    saveEdit(task.id)} > 
                                    💾
                                 </button>
                            ):(
                                <button 
                                    title="Edit task"
                                    className="border-none hover:ring-2 
                                    hover:ring-[#A18BFF] focus:outline-none"
                                    onClick={() => startEdit(task)} >
                                        ✏️
                                 </button>
                            )}
                           
                           <button 
                                title="Delete task"
                                className="border-none hover:ring-2 hover:ring-[#A18BFF] 
                                focus:outline-none"
                                onClick={() => deleteTask(task.id)} >
                                     🗑️
                           </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DayColumn;