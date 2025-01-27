/* eslint-disable @typescript-eslint/no-var-requires */
// Electron doesnt support ESM for renderer process. Alternatively, pass this file
// through a bundler but that feels like an overkill
import { dataNote } from "../interactSqlite/univInterface"
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('BloopAPI', {
	foo: 'bar',
	ping: () => ipcRenderer.invoke('sample:ping'),
	handleCreateNote: (dataNote: dataNote) => ipcRenderer.invoke("handleCreateNote", dataNote)
})
