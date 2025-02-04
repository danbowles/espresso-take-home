import { EMAIL_REGEX } from "../constants";
import { AgentFormProps } from "../types";
import { useState } from "react";

function AgentForm({ agent, onSubmit, onCancel }: AgentFormProps) {

  const [name, setName] = useState(agent?.name || "");
  const [email, setEmail] = useState(agent?.email || "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    agent?.status || "Active"
  );

  const isFormValid = () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return false;
    }
    if (!EMAIL_REGEX.test(String(email).toLowerCase())) {
      alert("Invalid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
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

export default AgentForm;
