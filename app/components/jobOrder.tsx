import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

const initialJobOrder = {
  employerName: "Lok, Wing Ching",
  code: "",
  expectedCommencementDate: "",
  asap: false,
  applicantName: "",
  restDay: "WEEKDAY",
  salary: "",
  allowance: "",
  adults: 1,
  elderly: "",
  elderlyHealth: "",
  children: 0,
  childrenAges: [] as number[],
  expectingBaby: "na",
  deliveryDate: "",
  residenceType: "na",
  residenceSize: "",
  bedrooms: 1,
  mainDuties: "",
  babysitting: "english",
  takeCareChildren: "english",
  cooking: "english",
  cleaning: "english",
  washing: "english",
  ironing: "english",
  laundry: "english",
  marketing: "english",
  gardening: "english",
  others: "",
  remarks: "",
};

export default function JobOrder() {
  const [form, setForm] = useState(initialJobOrder);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const children = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      children,
      childrenAges: Array(children)
        .fill(0)
        .map((_, i) =>
          typeof prev.childrenAges[i] === "number" ? prev.childrenAges[i] : 0
        ),
    }));
  };

  const handleChildAgeChange = (idx: number, value: string) => {
    setForm((prev) => {
      const ages = [...prev.childrenAges];
      ages[idx] = Number(value);
      return { ...prev, childrenAges: ages };
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Job Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">NAME OF EMPLOYER:</label>
              <input
                type="text"
                name="employerName"
                value={form.employerName}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold">CODE:</label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">
                EXPECTED COMMENCEMENT DATE:
              </label>
              <input
                type="date"
                name="expectedCommencementDate"
                value={form.expectedCommencementDate}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
              <div>
                <input
                  type="checkbox"
                  name="asap"
                  checked={form.asap}
                  onChange={handleChange}
                  id="asap"
                />
                <label htmlFor="asap" className="ml-2">
                  ASAP
                </label>
              </div>
            </div>
            <div>
              <label className="block font-semibold">NAME OF APPLICANT:</label>
              <input
                type="text"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">REST DAY:</label>
              <input
                type="text"
                name="restDay"
                value={form.restDay}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">SALARY:</label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">ALLOWANCE:</label>
              <input
                type="text"
                name="allowance"
                value={form.allowance}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">NO. OF ADULTS:</label>
              <input
                type="number"
                name="adults"
                min={1}
                max={5}
                value={form.adults}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">
                NO. OF ELDERLY AND AGE:
              </label>
              <input
                type="text"
                name="elderly"
                value={form.elderly}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">
                HEALTH CONDITION OF ELDERLY:
              </label>
              <input
                type="text"
                name="elderlyHealth"
                value={form.elderlyHealth}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">NO. OF CHILDREN:</label>
              <input
                type="number"
                name="children"
                min={0}
                max={5}
                value={form.children}
                onChange={handleChildrenChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            {form.children > 0 && (
              <div className="col-span-2">
                <label className="block font-semibold">AGES:</label>
                <div className="flex gap-2">
                  {Array.from({ length: form.children }).map((_, idx) => (
                    <input
                      key={idx}
                      type="number"
                      min={1}
                      max={18}
                      value={form.childrenAges[idx] || ""}
                      onChange={(e) =>
                        handleChildAgeChange(idx, e.target.value)
                      }
                      className="border px-2 py-1 rounded w-20"
                      placeholder={`Child ${idx + 1} Age`}
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="block font-semibold">EXPECTING BABY:</label>
              <select
                name="expectingBaby"
                value={form.expectingBaby}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="na">-- Please Select --</option>
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">DATE OF DELIVERY:</label>
              <input
                type="date"
                name="deliveryDate"
                value={form.deliveryDate}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">TYPE OF RESIDENCE:</label>
              <select
                name="residenceType"
                value={form.residenceType}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="na">-- Please Select --</option>
                <option value="english">House</option>
                <option value="chinese">Flat</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">SIZE:</label>
              <input
                type="text"
                name="residenceSize"
                value={form.residenceSize}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-semibold">NO. OF BEDROOM:</label>
              <input
                type="number"
                name="bedrooms"
                min={1}
                max={10}
                value={form.bedrooms}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">MAIN DUTIES:</label>
            <textarea
              name="mainDuties"
              value={form.mainDuties}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">BABYSITTING:</label>
              <select
                name="babysitting"
                value={form.babysitting}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">
                TAKE CARE OF CHILDREN:
              </label>
              <select
                name="takeCareChildren"
                value={form.takeCareChildren}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">COOKING:</label>
              <select
                name="cooking"
                value={form.cooking}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">CLEANING:</label>
              <select
                name="cleaning"
                value={form.cleaning}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">WASHING:</label>
              <select
                name="washing"
                value={form.washing}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">IRONING:</label>
              <select
                name="ironing"
                value={form.ironing}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">LAUNDRY:</label>
              <select
                name="laundry"
                value={form.laundry}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">MARKETING:</label>
              <select
                name="marketing"
                value={form.marketing}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">GARDENING:</label>
              <select
                name="gardening"
                value={form.gardening}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="english">Yes</option>
                <option value="chinese">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">OTHERS:</label>
              <input
                type="text"
                name="others"
                value={form.others}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">REMARKS:</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
              rows={2}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
              onClick={() => alert("Job Order Saved!")}
            >
              Save Job Order
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
