import { coreBase } from "./toDatabase.js";

interface dataCore {
    title: string
    content: string
}

const handleCreateCore = async (data: dataCore) => {
    try{
        await coreBase.create(data)
        console.log('status aman pada bridge')
    }catch(error){
        console.log('status tidak aman pada bridge')
        console.log('ini error : ', error)
    }
}

const bridgeDatabase = {
    invoke: [
        {
            name: "handleCreateCore",
            togo: handleCreateCore
        }
    ]
}

export {bridgeDatabase}