"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task <FaPlus size={13} />{" "}
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        Modal for add todo
      </Modal>
    </div>
  );
};

export default AddTask;
