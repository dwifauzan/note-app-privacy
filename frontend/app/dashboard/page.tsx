"use client"
import * as React from 'react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Sidebar from '@/component/sidebar';
import Toast from '@/component/toast';
import Card from '@/component/card';

interface FormNote {
    title: string
    deskripsi: string
}

export default function dashboard() {
    const [modalForm, setModalForm] = useState(false)
    const [formData, setFormData] = useState<FormNote>({ title: "", deskripsi: "" });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'info' | 'warning' | 'error'>('info');

    const modalOpen = () => {
        setModalForm(true)
    }

    const modalClose = () => {
        setModalForm(false)
        setFormData({ title: "", deskripsi: "" });
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFinish = async (event: FormEvent) => {
        event.preventDefault(); // Prevent form submission
        console.log("Note Title:", formData.title);
        console.log("Note Content:", formData.deskripsi);
        const data = {
            title: formData.title,
            content: formData.deskripsi
        }
        console.log('mau dikirim')
        const sendToBackend = await window.BloopAPI.handleCreateCore(data)
        console.log('ini isinya bang ', sendToBackend)
        const messageString = JSON.stringify(sendToBackend)
        const objectMessage = JSON.parse(messageString)
        console.log(objectMessage)
        if (objectMessage.status === 201) {
            console.log(objectMessage.message)
            setToastMessage(objectMessage.message);
            setToastType('success');
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        }

        modalClose(); // Close the modal after saving
    };
    return (
        <div>
            <Sidebar />
            <div className='p-4 sm:ml-64'>
                {showToast && <Toast message={toastMessage} type={toastType} />}
                {/* breadcumbs */}
                <nav className="flex pt-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">List-Note</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                {/* content */}
                <div className='mt-10'>
                    <button onClick={modalOpen} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3" type="button">
                        add new note!
                    </button>
        
                    <Card/>

                    {/* Modal */}
                    {modalForm && (
                        <div
                            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                        >
                            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add new Note
                                    </h3>
                                    <button
                                        onClick={modalClose}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-4 md:p-5">
                                    <form onSubmit={handleFinish} className="space-y-4"> {/* Use onSubmit */}
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Note Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="Enter note title"
                                                value={formData.title} // Bind value to state
                                                onChange={handleInputChange} // Add onChange handler
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Note Content
                                            </label>
                                            <textarea
                                                name="deskripsi" // Match the interface property name
                                                id="content" // Keep a consistent ID
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="Write your note here..."
                                                value={formData.deskripsi} // Bind to formData.deskripsi
                                                onChange={handleInputChange}
                                                required
                                                rows={15}
                                            />
                                        </div>

                                        <button
                                            type="submit" // Keep type="submit"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Save Note
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}