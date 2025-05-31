export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add your dashboard widgets/cards here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <p>Your dashboard content goes here</p>
        </div>
      </div>
    </div>
  );
} 