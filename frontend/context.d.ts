/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/

export interface IBloopAPI {
    handleCreateNote: any
	foo: string
	ping: () => Promise<string>
}

declare global {
	interface Window {
		BloopAPI: IBloopAPI
	}
}
