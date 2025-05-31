import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-8">Dashboard</div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="hover:text-gray-300">Home</Link>
            </li>
            <li className="mb-4">
              <Link to="/employer" className="hover:text-gray-300">Employer</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <nav className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/employer" className="hover:text-blue-600">Employer</Link>
            </div>
            <div>
              {/* Add user profile/logout here if needed */}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 