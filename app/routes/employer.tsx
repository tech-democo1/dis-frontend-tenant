export default function Employer() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add your employer-specific widgets/cards here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Employer Information</h2>
          <p>Employer dashboard content goes here</p>
        </div>
      </div>
    </div>
  );
} 