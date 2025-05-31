import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import { sidebarItems } from "../../constants";
import CreateEmployerProfileModal from "../../components/CreateEmployerProfileModal";
import EmployerProfileForm from "~/components/EmployerProfileForm";
// Example data, replace with your real data or API call
const employers = [
  { hkid: "A123456(7)", name: "John Chan", phone: "91234567" },
  { hkid: "B765432(1)", name: "Mary Lee", phone: "98765432" },
  // ...more records
];

const AdminLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Define handleSave function
  const handleSave = () => {
    // Implement save logic here
    setModalOpen(false);
  };

  // Filter suggestions
  const suggestions = employers.filter(
    (emp) =>
      emp.hkid.toLowerCase().includes(search.toLowerCase()) ||
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.phone.includes(search)
  );

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 min-h-screen">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Doc Management System
          </h1>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary-100 text-white"
                    : "text-gray-700 hover:bg-primary-50 hover:text-primary-500"
                }`
              }
              end
            >
              {item.icon && <img src={item.icon} alt="" className="w-5 h-5" />}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-light-200 h-full">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              placeholder="Quick search for Employer's HKID / Name / Phone Number..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-base bg-light-100 w-full"
            />
            {showSuggestions && search && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-20 max-h-48 overflow-auto">
                {suggestions.map((emp, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-primary-50 cursor-pointer"
                    onMouseDown={() => {
                      setSearch(emp.name);
                      setShowSuggestions(false);
                      // Optionally navigate or fill more fields
                    }}
                  >
                    {emp.name} ({emp.hkid}) - {emp.phone}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="bg-primary-100 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:bg-primary-500 transition-colors"
            onClick={() => {
              if (location.pathname !== "/employerList") {
                navigate(`/employerList?search=${encodeURIComponent(search)}`);
              } else {
                // If already on employerList, update the query param
                navigate(`/employerList?search=${encodeURIComponent(search)}`, {
                  replace: true,
                });
                // Optionally, trigger a state update or event to filter the table
              }
            }}
          >
            Search
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-sm hover:bg-blue-600 transition-colors"
            onClick={() => setModalOpen(true)}
          >
            Create Employer Profile
          </button>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
        <CreateEmployerProfileModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create Employer Profile"
          footer={<button className="btn btn-primary">Save</button>}
        >
          <EmployerProfileForm />
        </CreateEmployerProfileModal>
      </div>
    </div>
  );
};

export default AdminLayout;
