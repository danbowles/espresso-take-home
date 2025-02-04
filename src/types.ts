interface Agent {
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

interface AgentFormProps {
  agent: Agent | null;
  onSubmit: (agent: Agent) => void;
  onCancel: () => void;
}

interface AgentTableProps {
  agents: Agent[];
  handleAgentEdit: (agent: Agent) => void;
  handleAgentDelete: (agent: Agent) => void;
}

export type { Agent, AgentFormProps, AgentTableProps };
