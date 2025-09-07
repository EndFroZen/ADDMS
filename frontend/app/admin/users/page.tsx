"use client"
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";

import { 
  Users, 
  Search, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  RefreshCw,
  Shield,
  User,
  Save,
  X,
  Crown,
  UserCheck
} from "lucide-react";
// import { json } from "stream/consumers";

export default function UsersPage() {
  const [listUser, setListUser] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showActions, setShowActions] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

  const loadListUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/getlistalluser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      
      if (res.ok) {
        const result = await res.json();
        // console.log(result.data);
        setListUser(result.data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListUser();
  }, []);

  // Filter users based on search term and role
  const filteredUsers = listUser.filter((user: any) => {
    const matchesSearch = 
      user.Username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.Role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'text-red-600 bg-red-100';
      case 'user':
        return 'text-blue-600 bg-blue-100';
      case 'moderator':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      case 'moderator':
        return <Shield className="w-4 h-4" />;
      default:
        return <UserCheck className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStorage = (mb: number) => {
  if (!mb) return "0 MB";
  const k = 1024; // ใช้ 1024 MB = 1 GB
  const sizes = ["MB", "GB", "TB"];
  const i = Math.floor(Math.log(mb) / Math.log(k));
  return parseFloat((mb / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};



  const handleEdit = (user: any) => {
    setEditingUser({ ...user });
    setShowModal(true);
    setShowActions(null);
  };

  const handleSaveEdit = async () => {
   setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/updateuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body :JSON.stringify({
          ID : editingUser.ID,
          role: editingUser.Role,
          Storage_limit: editingUser.storage_limit,
        })
      });
      
      if (res.ok) {
        // const result = await res.json();
        // console.log(result.data);
        // setListUser(result.data);
        loadListUser();
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setEditingUser(false)
      setLoading(false);
    }
  };

  const handleDelete = (user: any) => {
    if (confirm(`Are you sure you want to delete user "${user.Username}"?`)) {
      console.log("Deleting user:", user);
      // Here you would make an API call to delete the user
    }
    setShowActions(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditingUser({ ...editingUser, [field]: value });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 flex min-h-screen min-w-screen">
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                  <p className="text-gray-600">Manage and control all users in the system</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={loadListUser}
                  className="bg-white border border-orange-200 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{listUser.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Administrators</p>
                    <p className="text-2xl font-bold text-red-600">
                      {listUser.filter((u: any) => u.Role === 'admin').length}
                    </p>
                  </div>
                  <Crown className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Regular Users</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {listUser.filter((u: any) => u.Role === 'user').length}
                    </p>
                  </div>
                  <User className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Recent Signups</p>
                    <p className="text-2xl font-bold text-green-600">
                      {listUser.filter((u: any) => {
                        const createdDate = new Date(u.CreatedAt);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return createdDate > weekAgo;
                      }).length}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-orange-100 shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Administrators</option>
                  <option value="user">Users</option>
                  <option value="moderator">Moderators</option>
                </select>
                
            
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-lg border border-orange-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                <span className="ml-3 text-gray-600">Loading users...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
                <p className="text-gray-600">No users match your search criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage Limit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user: any, index: number) => (
                      <tr key={user.ID} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.ID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.Username}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.Email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.Role)}`}>
                            {getRoleIcon(user.Role)}
                            <span className="ml-1 capitalize">{user.Role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatStorage(user.storage_limit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(user.CreatedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(user.UpdatedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative inline-block">
                            <button
                              onClick={() => setShowActions(showActions === index ? null : index)}
                              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            {showActions === index && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleEdit(user)}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  >
                                    <Edit3 className="w-4 h-4 mr-3" />
                                    Edit User
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user)}
                                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                                  >
                                    <Trash2 className="w-4 h-4 mr-3" />
                                    Delete User
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {Array.from({ length: Math.max(0, 5 - listUser.length) }).map((_, i) => (
                      <tr key={`empty-${i}`}>
                        <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-400">
                          {/* ว่างเปล่า */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={editingUser.Username}
                  onChange={(e) => handleInputChange('Username', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed focus:ring-0 focus:border-gray-300"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.Email}
                  onChange={(e) => handleInputChange('Email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed focus:ring-0 focus:border-gray-300"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={editingUser.Role}
                  onChange={(e) => handleInputChange('Role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Limit (MB)</label>
                <input
                  type="number"
                  value={editingUser.storage_limit}
                  onChange={(e) => handleInputChange('storage_limit', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Folder</label>
                <input
                  type="text"
                  value={editingUser.Folder}
                  onChange={(e) => handleInputChange('Folder', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed focus:ring-0 focus:border-gray-300"
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                <input
                  type="text"
                  value={editingUser.SecretKey}
                  onChange={(e) => handleInputChange('SecretKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed focus:ring-0 focus:border-gray-300"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}