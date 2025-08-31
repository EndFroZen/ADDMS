'use client';
import { useCallback, useEffect, useState } from "react";
import { Terminal, Save, X, Edit3, Play, Settings, AlertCircle, Blocks, FolderOpen, Pause, Clock } from "lucide-react";
import SelectPath from "./selectPath";
import { BASE_URL, NToken } from "@/config/plublicpara";
import { data } from "framer-motion/client";
import Loading from "./loading";
import "../../app/globals.css"




function AdvancedCommandSetting({ currentCommand, onSave }: { currentCommand: string; onSave: (cmd: string) => void }) {
  const [temp, setTemp] = useState(currentCommand);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Command</label>
        <input
          type="text"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Enter custom command..."
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onSave(temp)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
}
interface CommandSettingProps {
  FullPath: string;
  Name?: string;
  Status?: string;
  Pid?: number;
}

export default function CommandSetting({ FullPath, Name }: CommandSettingProps) {
  const [serverStatus, setServerStatus] = useState("offline");
  const [isEditingCommand, setIsEditingCommand] = useState(false);
  const [tempCommand, setTempCommand] = useState("");
  const [currentCommand, setCurrentCommand] = useState("null");
  const [showCommandSetting, setShowCommandSetting] = useState(false);
  const [choiceOfPage, setChoiceOfPage] = useState("command");
  const [showSelectPath, setShowSelectPath] = useState(false);
  const [pathSetCommand, setPathSetCommand] = useState("null");
  const [pidSave, setPidSave] = useState(0);
  const [serverSave, setServerSave] = useState("offline")
  const [loading, setLoading] = useState(false)
  const [pluginCommnad, setPluginCommand] = useState("null")
  const [pluginPath, setPluginPath] = useState("null")
  const [getAllPlugin, setGetAllPlugin] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const installcommnd = async (command: string, path: string) => {
    // console.log(command,path)
    setLoading(true)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/installplugin`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          "command": command,
          "path": path
        }),
      });
      // if (!response.ok) throw new Error("Failed to run server");
      const result = await response.json();
      // console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      getWebsite(FullPath);
      setLoading(false)
    }
  }

  const getWebsite = (() => {
    let timer: NodeJS.Timeout;

    return async (fullpath: string) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          const token =
            typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

          const response = await fetch(
            `${BASE_URL}/api/somewebsite?website=${fullpath}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch files");
          }
          const result = await response.json();

          setPathSetCommand(result.data.StartServer.Path || "null");
          setCurrentCommand(result.data.StartServer.Command || "null");
          setPidSave(result.data.Pid || 0);
          setServerSave(result.data.Status || "offline");
          loadGetInstall(result.data.ID)
        } catch (err) {
          console.error(err);
        }
      }, 500); // ✅ debounce 500ms
    };
  })();



  const handleStopServer = async (pid: number) => {
    setLoading(true)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/stopserver`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          "pid": pid
        }),
      });
      if (!response.ok) throw new Error("Failed to run server");
      const result = await response.json();
      // console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      getWebsite(FullPath);
      setServerSave("offine")
      setLoading(false)
    }
  };
  useEffect(() => {
    getWebsite(FullPath);
    // console.log(thisWebsiteId)

  }, [])
  const handleSaveCommand = () => {
    if (tempCommand.trim() !== "") {
      setCurrentCommand(tempCommand);
    }
    setIsEditingCommand(false);
  };
  const handleSavePluginCommnad = () => {
    if (pluginCommnad.trim() !== "") {
      setPluginCommand(pluginCommnad);
    }
    setIsEditingCommand(false);
  };

  const handleRunServer = async (Command: string, Path: string) => {
    setLoading(true)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/startserver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ command: Command, path: Path }),
      });

      if (!response.ok) {
        throw new Error("Failed to run server");
      }

      const result = await response.json();
      // console.log(result)
      setServerSave("online")
    } catch (err) {
      console.error(err);
    } finally {
      getWebsite(FullPath)
      setLoading(false)
    }
  };
  const loadGetInstall = async (id: Number) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/getplugin?websiteid=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      });
      if (response.ok) {
        const result = await response.json()
        console.log(result.plugin)
        await setGetAllPlugin(result.plugin)
      }
    } catch (err) {

    } finally {

    }
  }

  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {choiceOfPage === "command" && (
        <><div className="flex justify-between">
          <div className="p-4 border-b border-gray-200 bg-gray-50 w-full max-w-[50%] border-r border-gray-200 hover:cursor-pointer" onClick={() => setChoiceOfPage("command")}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Terminal size={20} className="text-orange-600" />
              Server Configuration
            </h3>
          </div>
          <div className="p-4 border-b border-gray-200 bg-gray-200 w-full max-w-[50%] hover:cursor-pointer" onClick={() => setChoiceOfPage("plugin")}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Blocks size={20} className="text-orange-600" />
              Plugin Configuration
            </h3>
          </div>
        </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* select Path */}
              <div className="bg-gray-50 border border-gray-200  rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${serverStatus === 'online' ? 'bg-green-500' :
                    serverStatus === 'starting' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  Path Directory
                </h4>
                <div className="flex items-center gap-2 justify-between">
                  <code className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-800">
                    {pathSetCommand}
                  </code>
                  <button onClick={() => setShowSelectPath(true)}><FolderOpen size={16} className="text-gray-600" /></button>
                </div>

                {showSelectPath && <SelectPath onSelect={(path) => setPathSetCommand(path)} onClose={() => setShowSelectPath(false)} fullPathTarget={FullPath} />}
              </div>

              {/* Current Command */}
              <div className="bg-gray-50 border border-gray-200  rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Terminal size={16} />
                  Run Command
                </h4>
                {isEditingCommand ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempCommand}
                      onChange={(e) => setTempCommand(e.target.value)}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-800"
                      placeholder="Enter command..."
                    />
                    <button
                      onClick={handleSaveCommand}
                      className="p-1 text-green-600 hover:bg-green-100 rounded transition"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingCommand(false);
                        setTempCommand("");
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <code className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-800">
                      {currentCommand}
                    </code>
                    <button
                      onClick={() => {
                        setIsEditingCommand(true);
                        setTempCommand(currentCommand);
                      }}
                      className="p-1 text-gray-600 hover:bg-gray-200 rounded transition"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="bg-gray-50 border border-gray-200  rounded-lg p-4 relative ">
                {loading && <div className="absolute inset-0 z-50 flex justify-center items-center animated-gradient rounded-lg"><Loading /></div>}
                <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
                <div className="flex flex-col gap-2">

                  <button
                    onClick={() => { serverSave === "online" ? handleStopServer(pidSave) : handleRunServer(currentCommand, pathSetCommand) }}
                    title={serverSave === "online" ? "stop server" : "run server"}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition ${serverSave === "online" ? ("bg-yellow-500 text-white hover:bg-yellow-300") : ("bg-green-600 text-white hover:bg-green-200")}`}
                  >
                    {serverSave === "online" ? (<><div className="flex flex-row items-center justify-center"><Pause size={16} />Stop Server</div></>) : (<><div className="flex flex-row items-center justify-center"><Play size={16} />Run server</div></>)}
                  </button>

                  <button
                    onClick={() => setShowCommandSetting(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 transition"
                  >
                    <Settings size={16} />
                    Advanced Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Command Preview */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-gray-300">Command Preview</h5>
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  <span className="text-gray-400">
                    Server {serverSave}
                  </span>
                </div>
              </div>
              <div className="font-mono text-sm text-green-400">
                <span className="text-blue-700">{pathSetCommand}</span>
                <span className="text-white">$</span> {currentCommand}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                This command will be executed when you start the server
              </div>
            </div>

          </div>

          {/* Command Settings Modal */}
          {showCommandSetting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Advanced Command Settings</h2>
                  <button
                    className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => setShowCommandSetting(false)}
                  >
                    ✕
                  </button>
                </div>
                <div>
                  <AdvancedCommandSetting currentCommand={currentCommand} onSave={setCurrentCommand} />
                </div>
              </div>
            </div>
          )}</>
      )}



      {choiceOfPage === "plugin" && (<>
        <div className="flex justify-between">
          <div className="p-4 border-b border-gray-200 bg-gray-200 w-full max-w-[50%] border-r border-gray-200 hover:cursor-pointer" onClick={() => setChoiceOfPage("command")}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Terminal size={20} className="text-orange-600" />
              Server Configuration
            </h3>
          </div>
          <div className="p-4 border-b border border-gray-200  bg-gray-50 w-full max-w-[50%] hover:cursor-pointer" onClick={() => setChoiceOfPage("plugin")}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Blocks size={20} className="text-orange-600" />
              Plugin Configuration
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Block inputcommand */}
            <div className="bg-gray-50 border border-gray-200  rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${serverStatus === 'online' ? 'bg-green-500' :
                  serverStatus === 'starting' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                Path Directory
              </h4>
              <div className="flex items-center gap-2 justify-between">
                <code className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-800">
                  {pluginPath}
                </code>
                <button onClick={() => setShowSelectPath(true)}><FolderOpen size={16} className="text-gray-600" /></button>
              </div>

              {showSelectPath && <SelectPath onSelect={(path) => setPluginPath(path)} onClose={() => setShowSelectPath(false)} fullPathTarget={FullPath} />}
            </div>
            <div className="bg-gray-50  border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Terminal size={16} />
                Run Command
              </h4>
              {isEditingCommand ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pluginCommnad}
                    onChange={(e) => setPluginCommand(e.target.value)}
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-800"
                    placeholder="Enter command..."
                  />
                  <button
                    onClick={handleSavePluginCommnad}
                    className="p-1 text-green-600 hover:bg-green-100 rounded transition"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingCommand(false);
                      setPluginCommand(pluginCommnad);
                    }}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-800">
                    {pluginCommnad}
                  </code>
                  <button
                    onClick={() => {
                      setIsEditingCommand(true);
                      setPluginCommand(pluginCommnad);
                    }}
                    className="p-1 text-gray-600 hover:bg-gray-200 rounded transition"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="bg-gray-50 border border-gray-200  rounded-lg p-4 relative">
              {loading && <div className="absolute inset-0 z-50 flex justify-center items-center animated-gradient rounded-lg"><Loading /></div>}
              <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
              <div className="flex flex-col gap-2">
                <button
                  // onClick={handleRunServer}
                  disabled={serverStatus === 'starting'}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition ${serverStatus === 'online'
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    } ${serverStatus === 'starting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => { installcommnd(pluginCommnad, pluginPath) }}
                >
                  <Play size={16} />
                  install
                </button>

                <button
                  onClick={() => setShowCommandSetting(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 transition"
                >
                  <Settings size={16} />
                  Advanced Settings
                </button>
              </div>
            </div>

          </div>

          {/* Command Preview */}
          <div className="flex flex-col justify-center gap-2">
            <div className="mt-6 p-4 bg-gray-900 rounded-lg  w-full">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-gray-300">Command Preview</h5>
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  <span className="text-gray-400">
                    {serverStatus === 'online' ? 'Ready to execute' : 'Server offline'}
                  </span>
                </div>
              </div>
              <div className="font-mono text-sm text-green-400">
                <span className="text-blue-700">{pluginPath}</span>
                <span className="text-white">$</span> {pluginCommnad}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                This command will be executed when you start the server
              </div>
            </div>
            <div className="bg-gray-200 w-full rounded-md ">
              <div className="flex flex-row gap-2  rounded-md justify-center hover:cursor-pointer font-bold  p-4 border border-gray-200 hover:border-orange-500"
                onClick={() => setShowHistory(!showHistory)}

              >
                History install plugin <Clock /> </div>
              {showHistory && (
                <div className=" max-h-[20rem] overflow-y-auto h-full ">

                  {getAllPlugin === null || getAllPlugin.length === 0 ? (
                    <div className="p-4 mb-2 rounded-lg bg-gray-900  text-white flex justify-center border border-gray-700">
                      This website not install plugin
                    </div>) : (
                    <div className="">
                      {getAllPlugin.map((cmd) => (
                        <div
                          key={cmd.id}
                          className="p-4 mb-2 rounded-lg bg-gray-900 border border-gray-700"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-mono text-blue-400">{cmd.command}</p>
                            <span className="text-xs text-gray-400">{cmd.time}</span>
                          </div>
                          {cmd.massage && (
                            <pre className="mt-2 text-green-400 text-sm whitespace-pre-wrap bg-black p-2 rounded-lg">
                              {cmd.massage}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>)}
                </div>

              )}

            </div>
          </div>

          {/* Warning/Info Messages */}
        </div>

        {/* Command Settings Modal */}
        {showCommandSetting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Advanced Command Settings</h2>
                <button
                  className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => setShowCommandSetting(false)}
                >
                  ✕
                </button>
              </div>
              <div>
                <AdvancedCommandSetting currentCommand={currentCommand} onSave={setPluginCommand} />
              </div>
            </div>
          </div>
        )}</>)}

    </div>
  )
}
