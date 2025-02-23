import { coreBase } from "./toDatabase.js";

interface dataCore {
    title: string
    content: string
}

const handleCreateCore = async (data: dataCore) => {
    try{
        await coreBase.create(data)
        return {status: 201, message: 'Success to add new!'}
    }catch(error){
        return {status: 400, message: 'something happen! Try again later?'}
    }
}

const handleFindAll = async () => {
    try{
        const resDatabase = await coreBase.findAll()
        return resDatabase
    }catch(error){
        return {status: 400, message: 'something happen! Try again later?'}
    }
}

const handleDelete = async (id: number) => {
    try{
        await coreBase.delete(id)
        return {status: 200, message: 'Success to delete!'}
    }catch(error){
        return {status: 400, message: 'something happen! Try again later?'}
    }
}

const bridgeDatabase = {
    invoke: [
        {
            name: "handleCreateCore",
            togo: handleCreateCore
        },
        {
            name: "handleFindAll",
            togo: handleFindAll
        },
        {
            name: "handleDelete",
            togo: handleDelete
        }
    ]
}

export {bridgeDatabase}