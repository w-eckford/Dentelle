export default function Home() {
  return (
    <div className="grid gap-4">
      <p>Welcome. Choose a portal:</p>
      <ul className="list-disc pl-6">
        <li><a className="text-blue-600" href="/employer">Employer Admin</a></li>
        <li><a className="text-blue-600" href="/employee">Employee</a></li>
        <li><a className="text-blue-600" href="/investor">Investor</a></li>
        <li><a className="text-blue-600" href="/audit">Audit</a></li>
      </ul>
    </div>
  );
}

