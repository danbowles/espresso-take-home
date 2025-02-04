
const headings = [
  'Agent Name',
  'Agent Email',
  'Status',
  'Last Seen',
  'Actions'
];

interface Agent {
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  lastSeen: string;
}

const agents: Agent[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    lastSeen: '10/01/2023'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Inactive',
    lastSeen: '09/30/2023'
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'Active',
    lastSeen: '10/02/2023'
  }
];

function Header() {
  return (
    <header className="pt-5 mb-5">
      <h1 className="text-3xl font-bold text-gray-900">Espresso Agent Management</h1>
      <hr className="mt-4 border-gray-300 dark:border-gray-700" />
    </header>
  );
}

function App() {
  return (
    <main className="flex flex-col min-h-screen w-full max-w-screen-xl mx-auto px-5">
      <Header/>
      <section className="">
        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add Agent
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {headings.map((heading) => (
                  <th key={heading} className="py-2 px-4 bg-gray-200 text-gray-600">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                 <tr key={agent.email}>
                    <td className="py-2 px-4 border-b border-gray-200">{agent.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{agent.email}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{agent.status}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{agent.lastSeen}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button className="text-blue-500 hover:text-blue-700">Edit</button>
                      <button className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                    </td>
                  </tr>
              ))}              
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
