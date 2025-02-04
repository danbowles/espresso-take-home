import { useState } from "react";

const headings = [
  "Agent Name",
  "Agent Email",
  "Status",
  "Last Seen",
  "Actions",
];

interface Agent {
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

const agents: Agent[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    lastSeen: "10/01/2023",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    lastSeen: "09/30/2023",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
    lastSeen: "10/02/2023",
  },
];

interface AgentFormProps {
  agent: Agent | null;
  onSubmit: (agent: Agent) => void;
  onCancel: () => void;
}

function AgentForm({ agent, onSubmit, onCancel }: AgentFormProps) {
  const [name, setName] = useState(agent?.name || "");
  const [email, setEmail] = useState(agent?.email || "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    agent?.status || "Active"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      status,
      lastSeen: agent?.lastSeen || new Date().toLocaleDateString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          className="w-full px-3 py-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}

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

function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleAgentDelete = (agent: Agent) => {
    setAgentToDelete(agent);
    setIsDeleteModalOpen(true);
  };

  const handleAgentEdit = (agent: Agent) => {
    setAgentToEdit(agent);
    setIsModalOpen(true);
  };

  const confirmDeleteAgent = () => {
    if (agentToDelete) {
      // Perform the delete operation here
      console.log(`Deleting agent: ${agentToDelete.name}`);
      setIsDeleteModalOpen(false);
      setAgentToDelete(null);
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
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {headings.map((heading) => (
                  <th
                    key={heading}
                    className="py-2 px-4 bg-gray-200 text-gray-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.email}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {agent.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {agent.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {agent.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {agent.lastSeen}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleAgentEdit(agent)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleAgentDelete(agent)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AgentForm
          agent={agentToEdit}
          onSubmit={() => {}}
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
