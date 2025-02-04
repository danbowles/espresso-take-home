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

type State = Agent[];

type Action =
  | { type: 'CREATE_AGENT'; payload: Agent }
  | { type: 'EDIT_AGENT'; payload: Agent }
  | { type: 'DELETE_AGENT'; payload: string };

export type { Agent, AgentFormProps, AgentTableProps, State, Action };
