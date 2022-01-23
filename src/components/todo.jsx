import React, { useState, useRef } from "react";

function Todo() {
    const [list, setList] = useState("");
    const [array, setArray] = useState([]);
    const [edit, setEdit] = useState({});
    const [message, setMessage] = useState("");
    const inputFocus = useRef(null);
    const generateId = () => {
        return Date.now();
    };
    const addHandler = (e) => {
        e.preventDefault();
        inputFocus.current.focus()
        if (!list) {
            return setMessage("isi dulu coy");
        }
        setMessage("");
        setArray([
            ...array,
            {
                id: generateId(),
                list,
                done: false,
            },
        ]);
        if (edit.id) {
            const updatedTodo = {
                ...edit,
                list,
            };
            const editTodosIndex = array.findIndex(function (arrays) {
                return arrays.id == edit.id;
            });
            const updatedTodos = [...array];
            updatedTodos[editTodosIndex] = updatedTodo;
            setArray(updatedTodos);
            return cancelHandler();
        }
        setList("");
    };
    const editHandler = (arrays) => {
        setList(arrays.list);
        setEdit(arrays);
    };
    const cancelHandler = () => {
        setEdit({});
        setList("");
    };
    const deleteHandler = (arrayId) => {
        const filtered = array.filter(function (arrays) {
            return arrays.id !== arrayId;
        });
        setArray(filtered);
        cancelHandler();
    };
    const checkHandler = (arrays) => {
        const updatedCheck = {
            ...arrays,
            done: arrays.done ? false : true,
        };
        const editTodosIndex = array.findIndex(function (currentArray) {
            return currentArray.id == arrays.id;
        });
        const updatedTodos = [...array];
        updatedTodos[editTodosIndex] = updatedCheck;
        setArray(updatedTodos);
    };
    return (
        <div>
            {message && (
                <div className="text-center text-2xl">{message}</div>
            )}
            <form onSubmit={addHandler} className="flex justify-center p-12">
                <div className="submit border-2 border-black rounded-md">
                <input
                    type="text"
                    ref={inputFocus}
                    onChange={function (e) {
                        setList(e.target.value);
                    }}
                    value={list}
                    placeholder="tambahkan tugas"
                    className="text-center focus:outline-none  text-black  font-sans font-bold"
                />
                <button
                    type="submit"
                    className="p-2  bg-black text-white"
                >
                    {edit.id ? "perbarui" : "tambahkan"}
                </button>
                {edit.id && <button className="bg-red-600 p-2 text-white" onClick={cancelHandler}>batalkan</button>}
                </div>
            </form>
            {array.length > 0 ? (
                <ul className="text-center ">
                    {array.map(function (arrays) {
                        return (
                            <div className="flex text-center justify-center font-bold font-sans">
                                <li
                                    key={arrays.id}
                                    className="font-bold text-2xl font-sans mx-3 m-2"
                                >
                                    {arrays.list} (
                                    {arrays.done ? "selesai" : "belum selesai"})
                                </li>
                                <input
                                    className="m-4"
                                    checked={arrays.done}
                                    type="checkbox"
                                    onChange={checkHandler.bind(this, arrays)}
                                />
                                <button
                                    className="border-2 border-black rounded-md font-bold font-sans p-2"
                                    onClick={editHandler.bind(this, arrays)}
                                >
                                    perbarui
                                </button>
                                <button
                                    className="border-2 border-black rounded-md font-bold font-sans p-2"
                                    onClick={deleteHandler.bind(
                                        this,
                                        arrays.id
                                    )}
                                >
                                    hapus
                                </button>
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <div className="text-center text-2xl ">tidak ada tugas</div>
            )}
        </div>
    );
}

export default Todo;
