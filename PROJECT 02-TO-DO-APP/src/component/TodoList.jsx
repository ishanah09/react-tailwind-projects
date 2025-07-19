import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import todoImage from "../assets/note_13650723.png";
import { MdEdit, MdDelete } from "react-icons/md";

export default function TodoList() {
  const [input, setInput] = useState("");
  const [editingID, setEditingID] = useState(null);
  const [editedInput, setEditedInput] = useState("");
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const filteredList = list.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  function handleChangeInput(e) {
    setInput(e.target.value);
  }

  function handleUpdateInput(e) {
    e.preventDefault();
    if (input.length > 0) {
      setList([...list, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
    setFilter("all");
  }

  function handleCheck(id) {
    setList(
      list.map((item, i) => {
        if (id === item.id) {
          return { ...item, completed: !item.completed };
        } else return item;
      })
    );
  }

  function handleEdit(id, currentText) {
    setEditedInput(currentText);
    setEditingID(id);
  }

  function handleDelete(id) {
    setList(list.filter((item) => item.id !== id));
  }

  function handleSave(id) {
    setList(
      list.map((item) => {
        if (id === item.id) {
          return { ...item, text: editedInput };
        } else {
          return item;
        }
      })
    );
    setEditingID(null);
  }

  function handleEditingChange(e) {
    setEditedInput(e.target.value);
  }

  useEffect(() => {
    let storedMode = JSON.parse(localStorage.getItem("mode"));
    if (storedMode === true) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("mode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("list"));
    if (storedList) {
      storedList.length > 0 && setList(storedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <main className="flex items-start justify-center  w-full min-h-screen bg-background py-10 px-4 ">
      <section className="w-full max-w-[500px] shadow-2xl px-4 py-8 sm:px-6 rounded-2xl bg-surface">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-center text-3xl font-bold tracking-wide font-headings text-main">
              Todo List
            </h1>
            <img
              src={todoImage}
              alt="todo app icon"
              className="w-[25px] h-[25px]"
            />
          </div>

          {darkMode ? (
            <FiSun
              role="button"
              aria-label="Switch to light mode"
              className="size-9 cursor-pointer text-gray-100"
              onClick={() => setDarkMode(false)}
            />
          ) : (
            <IoMoon
              role="button"
              aria-label="Switch to dark mode"
              className="size-7 cursor-pointer"
              onClick={() => setDarkMode(true)}
            />
          )}
        </div>

        <form
          className="flex gap-4 justify-between mb-5  "
          onSubmit={(e) => handleUpdateInput(e)}
        >
          <input
            className=" border-2 border-gray-300 p-2.5 pl-3 rounded-md  w-full text-md text-main cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-400 "
            placeholder="Enter todo Item"
            type="text"
            maxLength={50}
            value={input}
            onChange={(e) => handleChangeInput(e)}
          />

          <button className="bg-green-500 text-white py-2 px-3.5 rounded-md cursor-pointer hover:bg-green-700  tracking-wide active:scale-90">
            Add
          </button>
        </form>

        <div className="flex gap-4 item-center justify-start  font-medium tracking-wide text-white  p-3.5 mb-8 bg-gray-200 rounded-lg shadow-xl ">
          <button
            className={`${
              filter === "all" && "text-black font-semibold bg-red-600 border-2"
            } cursor-pointer text-xs sm:text-sm  py-2 px-2 sm:px-4 rounded-lg bg-red-400  active:scale-90`}
            onClick={() => {
              setFilter("all");
            }}
          >
            All
          </button>
          <button
            className={`${
              filter === "active" && "text-black font-semibold bg-red-600  border-2"
            } cursor-pointer text-xs sm:text-sm  py-2 px-2 sm:px-4 rounded-lg bg-red-400  active:scale-90`}
            onClick={() => {
              setFilter("active");
            }}
          >
            Active
          </button>
          <button
            className={`${
              filter === "completed" && "text-black font-semibold bg-red-600 border-2"
            } cursor-pointer text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-lg bg-red-400  active:scale-90`}
            onClick={() => {
              setFilter("completed");
            }}
          >
            Completed
          </button>
        </div>

        <ul className="">
          {filteredList.map((item) => (
            <li
              key={item.id}
              className="mb-4 rounded-lg bg-gray-100 py-2.5 px-2 flex items-center justify-between gap-2 border-1 border-gray-300 text-gray-900 "
            >
              <div className="w-full flex items-center gap-2   ">
                {item.completed ? (
                  <FaCheckCircle
                    className="h-5 min-w-5 text-yellow-300 cursor-pointer"
                    onClick={() => handleCheck(item.id)}
                  />
                ) : (
                  <div
                    className=" h-5 min-w-5 rounded-full border-2 border-yellow-500 cursor-pointer"
                    onClick={() => handleCheck(item.id)}
                  ></div>
                )}
                {item.id === editingID ? (
                  <input
                    type="text"
                    className=" border-2 border-gray-300 pl-2 rounded-md  w-full bg-white"
                    maxLength={50}
                    value={editedInput}
                    onChange={(e) => handleEditingChange(e)}
                  />
                ) : (
                  <p className="break-all">
                    {item.completed ? (
                      <del className="text-muted">{item.text}</del>
                    ) : (
                      item.text
                    )}
                  </p>
                )}
              </div>

              <div className="flex gap-2 self-start">
                {item.id === editingID ? (
                  <button
                    className="bg-blue-500 text-white py-1 px-2.5 rounded-md cursor-pointer hover:bg-blue-700  tracking-wide text-sm active:scale-90"
                    disabled={item.completed}
                    onClick={() => handleSave(item.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-1 px-2.5 rounded-md cursor-pointer hover:bg-blue-700  tracking-wide text-sm active:scale-90"
                    disabled={item.completed}
                    onClick={() => handleEdit(item.id, item.text)}
                  >
                    <span className="hidden sm:inline">Edit</span>
                    <MdEdit className="sm:hidden size-4" />
                  </button>
                )}

                <button
                  className="bg-red-500 text-white py-1 px-2.5 rounded-md cursor-pointer hover:bg-red-700  tracking-wide text-sm active:scale-90"
                  onClick={() => handleDelete(item.id)}
                >
                  <span className="hidden sm:inline">Delete</span>
                  <MdDelete className="sm:hidden size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
