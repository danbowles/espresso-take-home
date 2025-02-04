import { useState } from "react";
import { Agent } from "../types";
import AgentForm from "../components/AgentForm";
import Modal from "../components/Modal";
import AgentTable from "../components/AgentTable";
import { useAgentsReducer } from "./reducers/AgentsReducer";

// const agents: Agent[] = [
//   {
//     name: "John Doe",
//     email: "john@example.com",
//     status: "Active",
//     lastSeen: "10/01/2023",
//   },
//   {
//     name: "Jane Smith",
//     email: "jane@example.com",
//     status: "Inactive",
//     lastSeen: "09/30/2023",
//   },
//   {
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     status: "Active",
//     lastSeen: "10/02/2023",
//   },
// ];

function Header() {
  return (
    <header className="pt-5 mb-5">
      <h1 className="text-3xl font-bold text-gray-900">
        Espresso Agent Management
      </h1>
      <hr className="mt-4 border-gray-300 dark:border-gray-700" />
    </header>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [state, dispatch] = useAgentsReducer();
  const handleAgentDelete = (agent: Agent) => {
    setAgentToDelete(agent);
    setIsDeleteModalOpen(true);
  };

  const handleAgentEdit = (agent: Agent) => {
    setAgentToEdit(agent);
    setIsModalOpen(true);
  };

  const handleAgentFormSubmit = (agent: Agent) => {
    if (agentToEdit) {
      dispatch({ type: "EDIT_AGENT", payload: agent });
    } else {
      dispatch({ type: "CREATE_AGENT", payload: agent });
    }
    setIsModalOpen(false);
    setAgentToEdit(null);
  }

  const confirmDeleteAgent = () => {
    if (agentToDelete) {
      // Perform the delete operation here
      console.log(`Deleting agent: ${agentToDelete.name}`);
      setIsDeleteModalOpen(false);
      setAgentToDelete(null);
      dispatch({ type: "DELETE_AGENT", payload: agentToDelete.email });
    }
  };
  return (
    <main className="flex flex-col min-h-screen w-full max-w-screen-xl mx-auto px-5">
      <Header />
      <section className="">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Agent
          </button>
        </div>
        <div className="overflow-x-auto">
          {state.length === 0 ? (
            <p className="text-center text-gray-500">No agents found</p>
          ) : (
          <AgentTable
            agents={state}
            handleAgentEdit={handleAgentEdit}
            handleAgentDelete={handleAgentDelete}
          />
        )}
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AgentForm
          agent={agentToEdit}
          onSubmit={handleAgentFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div>
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete {agentToDelete?.name}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={confirmDeleteAgent}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default App;
