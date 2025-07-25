import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function Members() {
  const [members, setMembers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const membersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users (excluding admin)
  const fetchUsers = async () => {
    setLoading(true); // optional, if you want to reload later
    try {
      const res = await axios.get("http://192.168.1.188:5000/api/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const allUsers = res.data as any[];
      const nonAdminUsers = allUsers.filter(
        (user: any) => user.role !== "admin"
      );
      setMembers(nonAdminUsers);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false); // <- Add this
    }
  };

  // Handle Delete User
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the Member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://192.168.1.188:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire("Deleted!", "Member has been removed.", "success");
        fetchUsers();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete Member.", "error");
      }
    }
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(members.length / membersPerPage);

  return (
    <div className="p-6 font-['Quicksand'] w-full">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Members Management</h2>
      </div>

      {/* members Table */}
      <div className="bg-white shadow rounded-xl p-6">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    {/* <th className="p-3 text-sm font-semibold text-gray-600">members ID</th> */}
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Phone
                    </th>
                    <th className="p-3 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-500">
                        No Members found.
                      </td>
                    </tr>
                  ) : (
                    currentMembers.map((member, index) => (
                      <tr key={member._id || index} className="border-t">
                        {/* <td className="p-3 text-sm">{members._id}</td> */}
                        <td className="p-3 text-sm">{member.name}</td>
                        <td className="p-3 text-sm">{member.email}</td>
                        <td className="p-3 text-sm">{member.phone}</td>
                        <td className="p-3 text-sm flex gap-2">
                          <button
                            title="Delete members"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(member._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-md transition-all duration-200 ${
                        currentPage === num
                          ? "bg-orange-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
