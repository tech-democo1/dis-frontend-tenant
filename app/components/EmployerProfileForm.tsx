// EmployerProfileForm.tsx
import React from "react";

export default function EmployerProfileForm() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">
            HKID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            defaultValue="Z683365(5)"
          />
        </div>
        <div>
          <label className="block font-semibold">
            Chinese Name <span className="text-red-500">*</span>
          </label>
          <input type="text" className="border px-2 py-1 rounded w-full" />
        </div>
        <div>
          <label className="block font-semibold">
            English Surname <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            placeholder="Surname"
          />
        </div>
        <div>
          <label className="block font-semibold">
            English Given Names <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="border px-2 py-1 rounded w-full"
            placeholder="Given Names"
            defaultValue="Wing Ching"
          />
        </div>
        <div>
          <label className="block font-semibold">Date of Birth</label>
          <input
            type="date"
            className="border px-2 py-1 rounded w-full"
            defaultValue="1985-06-03"
          />
        </div>
        <div>
          <label className="block font-semibold">Gender</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-2"
              />{" "}
              Female
            </label>
            <label className="flex items-center">
              <input type="radio" name="gender" value="male" className="mr-2" />{" "}
              Male
            </label>
          </div>
        </div>
        <div>
          <label className="block font-semibold">
            Mobile Phone <span className="text-red-500">*</span>
          </label>
          <input type="text" className="border px-2 py-1 rounded w-full" />
        </div>
        <div>
          <label className="block font-semibold">Email Address</label>
          <input type="email" className="border px-2 py-1 rounded w-full" />
        </div>
        <div>
          <label className="block font-semibold">
            Preferred language <span className="text-red-500">*</span>
          </label>
          <select className="border px-2 py-1 rounded w-full">
            <option value="na">-- Please Select --</option>
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
      </div>
      {/* Add more fields as needed, following the structure of your home.html */}
    </form>
  );
}
