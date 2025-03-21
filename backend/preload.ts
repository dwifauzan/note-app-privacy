/* eslint-disable @typescript-eslint/no-var-requires */
// Electron doesnt support ESM for renderer process. Alternatively, pass this file
// through a bundler but that feels like an overkill
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('BloopAPI', {
	foo: 'bar',
	ping: () => ipcRenderer.invoke('sample:ping'),
	handleCreateCore: (data: any) => ipcRenderer.invoke("handleCreateCore", data),
	handleFindAll: (args: any) => ipcRenderer.invoke("handleFindAll", args),
	handleDelete: (id: number) => ipcRenderer.invoke("handleDelete", id)
})
