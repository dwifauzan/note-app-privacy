/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/

export interface IBloopAPI {
	foo: string
	ping: () => Promise<string>
	handleCreateCore: (data: any) => Promise<any> 
	handleFindAll: () => Promise<any>
	handleDelete: (id: number) => Promise<any>
}

declare global {
	interface Window {
		BloopAPI: IBloopAPI
	}
}
