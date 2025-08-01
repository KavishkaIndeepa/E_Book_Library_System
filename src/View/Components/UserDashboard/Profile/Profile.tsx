import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Profile() {
  type UserData = {
    name: string;
    email: string;
    phone: string;
    profileImage: string;
  };

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get<UserData>(
        "https://ebooklibrarysystembackend-production.up.railway.app/api/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userData = res.data;
      setUser(userData);
      setFormData({
        name: userData.name,
        phone: userData.phone,
        profileImage: userData.profileImage,
      });
    } catch (err) {
      console.error("Fetch User Error:", err);
      Swal.fire("Error", "Failed to load user profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      const updatedData = { ...formData };

      await axios.put("https://ebooklibrarysystembackend-production.up.railway.app/api/users/me", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Success", "Profile updated successfully", "success");
      setEditing(false);
      await fetchUser();
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setUpdating(false);
    }
  };

  const getInitials = (name: string): string => {
    const names = name.trim().split(" ");
    return names.slice(0, 2).map((n) => n.charAt(0).toUpperCase()).join("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="profileImage" className="cursor-pointer relative">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-white border-2 border-gray-300">
                {getInitials(formData.name)}
              </div>
            )}
            {editing && (
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            )}
          </label>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {formData.name || "No Name"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
              disabled={updating}
            >
              {updating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mx-auto"></div>
              ) : (
                "Save"
              )}
            </button>
            <button
              onClick={() => {
                if (user) {
                  setFormData({
                    name: user.name,
                    phone: user.phone,
                    profileImage: user.profileImage,
                  });
                }
                setEditing(false);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          editable={editing}
        />
        <InputField label="Email" value={user?.email ?? ""} editable={false} />
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <PhoneInput
            country={"lk"}
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            disabled={!editing}
            inputProps={{
              name: "phone",
              required: true,
            }}
            inputStyle={{
              width: "100%",
              padding: "12px 12px 12px 45px",
              borderRadius: "8px",
              border: editing ? "1px solid #ccc" : "1px solid #e0e0e0",
              backgroundColor: editing ? "#fff" : "#f5f5f5",
            }}
            containerClass="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  editable = true,
}: {
  label: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={editable ? onChange : undefined}
        disabled={!editable}
        className={`w-full px-4 py-2 text-gray-700 border ${
          editable ? "border-gray-300" : "bg-gray-100"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
}
