"use client"
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";

import {
  Globe,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Plus,
  RefreshCw,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  Folder,
  File,
  X,
  ArrowLeft,
  Save,
  Cpu,
  HardDrive,
  Activity,
  User
} from "lucide-react";

export default function WebsitePage() {
  const [listWebsite, setListWebsite] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedWebsite, setSelectedWebsite] = useState<any>(null);
  const [showActions, setShowActions] = useState<number | null>(null);
  const [showEditField, setShowEditField] = useState(false);
  const [folderContent, setFolderContent] = useState<any[]>([]);
  const [userUsername, setUserUsername] = useState<string>("");
  const [editText, setEditText] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [pathHistory, setPathHistory] = useState<string[]>([]);

  const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

  const formatSize = (size: number) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  const loadListWebsite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/getlistallwebsite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result.data);
        setListWebsite(result.data);
      }
    } catch (error) {
      console.error("Error loading websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFile = async (username: string, filepath: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/file/${username}/${filepath}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const result = await res.json();
        setSelectedFile(result.data);
        setFileContent(result.data.content);
        setEditText(true);
      }
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  const loadfolderUser = async (username: string, fullpath: string, isBack: boolean = false) => {
    setShowEditField(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/file/${username}/${fullpath}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result.data);
        setFolderContent(result.data);
        if (!isBack) {
          setPathHistory(prev => [...prev, fullpath]);
        }
      }
    } catch (error) {
      console.error("Error loading folder:", error);
    }
  };

  useEffect(() => {
    loadListWebsite();
  }, []);

  // Filter websites based on search term and status
  const filteredWebsites = listWebsite.filter((website: any) => {
    const matchesSearch = website.Domain?.Domain_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || website.Status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'online':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'offline':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'online':
        return <CheckCircle className="w-4 h-4" />;
      case 'offline':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
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
    if (!mb) return '0 MB';
    const k = 1024;
    const sizes = ['MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(mb) / Math.log(k));
    return parseFloat((mb / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleEdit = (website: any) => {
    setShowEditField(true);
    loadfolderUser(website.User?.Username, website.Domain?.Domain_name);
    setUserUsername(website.User?.Username);
    setShowActions(null);
  };

  const handleDelete = (website: any) => {
    if (confirm(`Are you sure you want to delete website ${website.Domain?.Domain_name}?`)) {
      console.log("Deleting website:", website);
    }
    setShowActions(null);
  };

  const handleView = (website: any) => {
    window.open(`https://${website.Domain?.Domain_name}`, '_blank');
    setShowActions(null);
  };

  const handleNotify = (website: any) => {
    console.log("Notifying user about:", website);
    setShowActions(null);
  };

  const getCurrentPath = () => {
    return pathHistory[pathHistory.length - 1] || '';
  };

  const goBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = [...pathHistory];
      newHistory.pop();
      const prevPath = newHistory[newHistory.length - 1];
      setPathHistory(newHistory);
      loadfolderUser(userUsername, prevPath, true);
    }
  };

  const saveFile = () => {
    // Add your save file logic here
    console.log("Saving file:", selectedFile, fileContent);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 flex min-h-screen">
      <div className="flex-1 p-6">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-1">Website Management</h1>
                  <p className="text-gray-600 text-lg">Monitor and manage all websites in your system</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={loadListWebsite}
                  disabled={loading}
                  className="bg-white border-2 border-orange-200 text-orange-600 px-6 py-3 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 flex items-center gap-2 font-medium shadow-sm"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Websites</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{listWebsite.length}</p>
                    <p className="text-sm text-gray-500 mt-1">All registered sites</p>
                  </div>
                  <div className="w-16 h-16  rounded-2xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Online</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">
                      {listWebsite.filter((w: any) => w.Status === 'online').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Active & running</p>
                  </div>
                  <div className="w-16 h-16  rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Offline</p>
                    <p className="text-3xl font-bold text-red-600 mt-1">
                      {listWebsite.filter((w: any) => w.Status === 'offline').length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Need attention</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search websites by domain name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-900 font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>

              </div>
            </div>
          </div>

          {/* Enhanced Website List */}
          <div className="bg-white rounded-xl border border-orange-100 shadow-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center">
                  <RefreshCw className="w-12 h-12 animate-spin text-orange-500 mb-4" />
                  <span className="text-lg text-gray-600 font-medium">Loading websites...</span>
                </div>
              </div>
            ) : filteredWebsites.length === 0 ? (
              <div className="text-center py-16">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Websites Found</h3>
                <p className="text-gray-600">No websites match your search criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Domain</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Storage</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Resources</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredWebsites.map((website: any, index: number) => (
                      <tr key={website.ID} className="hover:bg-orange-50 transition-all duration-200 group">
                        <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {website.User?.Username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                              <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {website.Domain?.Domain_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                https://{website.Domain?.Domain_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(website.Status)}`}>
                            {getStatusIcon(website.Status)}
                            <span className="ml-1.5 capitalize">{website.Status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <HardDrive className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {formatStorage(website.StorageUsage)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 font-medium">
                          {formatDate(website.CreatedAt)}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Cpu className="w-4 h-4 text-blue-500 mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {website.resource?.cpu?.toFixed(1) || '0'}%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Activity className="w-4 h-4 text-green-500 mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {website.resource?.ram?.toFixed(0) || '0'}MB
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative inline-block">
                            <button
                              onClick={() => setShowActions(showActions === index ? null : index)}
                              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group-hover:bg-orange-100"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>

                            {showActions === index && (
                              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl z-20 border border-gray-200 overflow-hidden">
                                <div className="py-2">
                                  <button
                                    onClick={() => handleView(website)}
                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 w-full text-left transition-colors duration-200"
                                  >
                                    <Eye className="w-4 h-4 mr-3 text-blue-500" />
                                    View Website
                                  </button>
                                  <button
                                    onClick={() => handleEdit(website)}
                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 w-full text-left transition-colors duration-200"
                                  >
                                    <Edit3 className="w-4 h-4 mr-3 text-green-500" />
                                    Manage Files
                                  </button>
                                  <button
                                    onClick={() => handleNotify(website)}
                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 w-full text-left transition-colors duration-200"
                                  >
                                    <Bell className="w-4 h-4 mr-3 text-yellow-500" />
                                    Notify Owner
                                  </button>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={() => handleDelete(website)}
                                    className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                                  >
                                    <Trash2 className="w-4 h-4 mr-3" />
                                    Delete Website
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
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

      {/* Enhanced File Manager Modal */}
      {showEditField && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">File Manager</h2>
                    <p className="text-orange-100">Managing files for: {userUsername}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {pathHistory.length > 1 && (
                    <button
                      onClick={goBack}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowEditField(false)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Path breadcrumb */}
              <div className="mt-4 text-orange-100">
                <span className="text-sm">Current path: /{getCurrentPath()}</span>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* File/Folder List */}
              <div className="space-y-2">
                {folderContent
                  ?.slice()
                  .sort((a: any, b: any) => {
                    if (a.type === b.type) return 0;
                    return a.type === "folder" ? -1 : 1;
                  })
                  .map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 hover:bg-orange-50 p-4 rounded-xl cursor-pointer transition-all duration-200 border border-gray-100 hover:border-orange-200"
                      onClick={() => {
                        if (item.type === "folder") {
                          loadfolderUser(userUsername, item.path);
                        } else {
                          loadFile(userUsername, item.path);
                        }
                      }}
                    >
                      {/* Icon + File/Folder name */}
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === "folder"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                          }`}>
                          {item.type === "folder" ? (
                            <Folder className="w-5 h-5" />
                          ) : (
                            <File className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">{item.name}</span>
                          <div className="text-sm text-gray-500">
                            {item.type === "folder" ? "Folder" : "File"}
                          </div>
                        </div>
                      </div>

                      {/* Size + Modified Date */}
                      <div className="text-sm text-gray-500 text-right">
                        <div className="font-medium">{formatSize(item.size)}</div>
                        <div>{new Date(item.modified).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* File Editor */}
              {editText && selectedFile && (
                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <File className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-bold text-gray-900">{selectedFile.name}</h3>
                    </div>
                  </div>

                  <textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="w-full h-96 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm text-gray-900 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                    placeholder="File content will appear here..."
                  />

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={saveFile}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditText(false);
                        setSelectedFile(null);
                        setFileContent("");
                      }}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}