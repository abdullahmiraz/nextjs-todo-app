"use client";
import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { addTodo, deleteTodo, editTodo } from "@/api";
import router from "next/router";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };
  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor={"pointer"}
          className="text-blue-500"
          size={23}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor={"pointer"}
          className="text-red-500"
          size={23}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <div className="flex flex-col  gap-4">
            <h3 className="text-lg">
              Are you sure you want to delete this task ?
            </h3>

            <div className="modal-action">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn bg-red-500 text-white hover:text-black"
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
