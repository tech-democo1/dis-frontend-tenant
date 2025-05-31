import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";

const initialEmployer = {
  name: "John Doe",
  phone: "123-456-7890",
  address: "123 Main St, Hong Kong",
};

const initialHelpers = [
  {
    id: "h1",
    name: "May Chan",
    code: "C123",
    status: "Active",
    period: "2023-01-01 to 2025-01-01",
  },
  {
    id: "h2",
    name: "Susan Lee",
    code: "C456",
    status: "Completed",
    period: "2021-01-01 to 2023-01-01",
  },
];

export default function EmployerProfile() {
  const [helpers, setHelpers] = useState(initialHelpers);
  const [tab, setTab] = useState("employer");
  const [employer, setEmployer] = useState(initialEmployer);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(employer);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEmployer(editForm);
    setEditing(false);
  };

  return (
    <div className="flex gap-6">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <CardTitle>Employer Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList>
              <TabsTrigger value="employer">Employer Info</TabsTrigger>
              {helpers.map((helper) => (
                <TabsTrigger key={helper.id} value={helper.id}>
                  {helper.name}
                </TabsTrigger>
              ))}
              <TabsTrigger value="add-helper" className="flex items-center">
                <Plus className="w-4 h-4 mr-1" /> Add Helper
              </TabsTrigger>
            </TabsList>
            <TabsContent value="employer">
              <div className="space-y-2 py-4">
                {editing ? (
                  <>
                    <div>
                      <strong>Name:</strong>{" "}
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    </div>
                    <div>
                      <strong>Phone:</strong>{" "}
                      <input
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    </div>
                    <div>
                      <strong>Address:</strong>{" "}
                      <input
                        name="address"
                        value={editForm.address}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-80"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        onClick={() => {
                          setEditForm(employer);
                          setEditing(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>Name:</strong> {employer.name}
                    </div>
                    <div>
                      <strong>Phone:</strong> {employer.phone}
                    </div>
                    <div>
                      <strong>Address:</strong> {employer.address}
                    </div>
                    <button
                      className="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </TabsContent>
            {helpers.map((helper) => (
              <TabsContent key={helper.id} value={helper.id}>
                <div className="space-y-2 py-4">
                  <div>
                    <strong>Name:</strong> {helper.name}
                  </div>
                  <div>
                    <strong>Code:</strong> {helper.code}
                  </div>
                  <div>
                    <strong>Status:</strong> {helper.status}
                  </div>
                  <div>
                    <strong>Period:</strong> {helper.period}
                  </div>
                </div>
              </TabsContent>
            ))}
            <TabsContent value="add-helper">
              <div className="py-8 flex flex-col items-center justify-center">
                <Plus className="w-8 h-8 mb-2 text-gray-400" />
                <div className="text-gray-500 mb-4">
                  Add a new helper to this employer.
                </div>
                <button
                  className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                  onClick={() => {
                    const newHelper = {
                      id: `h${helpers.length + 1}`,
                      name: `New Helper ${helpers.length + 1}`,
                      code: `C${100 + helpers.length + 1}`,
                      status: "Active",
                      period: "2025-01-01 to 2027-01-01",
                    };
                    setHelpers([...helpers, newHelper]);
                    setTab(newHelper.id);
                  }}
                >
                  Add Helper
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className="w-96">{/* ...your new card content... */}</Card>
    </div>
  );
}
