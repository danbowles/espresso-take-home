import { TABLE_HEADERS } from "../constants";
import { AgentTableProps } from "../types";

function TableHead() {
  return (
    <thead>
      <tr>
        {TABLE_HEADERS.map((heading) => (
          <th key={heading} className="py-2 px-4 bg-gray-200 text-gray-600">
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="py-2 px-4 border-b border-gray-200">{children}</td>;
}

function AgentTable({
  agents,
  handleAgentEdit,
  handleAgentDelete,
}: AgentTableProps) {
  return (
    <table className="min-w-full bg-white">
      <TableHead />
      <tbody>
        {agents.map((agent) => (
          <tr key={agent.email}>
            <Td>{agent.name}</Td>
            <Td>{agent.email}</Td>
            <Td>{agent.status}</Td>
            <Td>{agent.lastSeen}</Td>
            <Td>
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
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AgentTable;
