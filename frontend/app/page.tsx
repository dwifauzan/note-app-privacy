"use client"
import { useEffect, useState } from 'react'
import Sidebar from './component/sidebar'
import Image from 'next/image'
import Cloud from '@/assets/cloud.jpg'

export default function Home() {
	// Menyimpan waktu dan ucapan dalam state
	const [time, setTime] = useState<string>("")
	const [greeting, setGreeting] = useState<string>("")

	// Fungsi untuk memperbarui waktu setiap detik
	const updateClock = () => {
		const now = new Date()

		// Mengambil jam, menit, detik, dan AM/PM
		let hours = now.getHours()
		const minutes = String(now.getMinutes()).padStart(2, '0')
		const seconds = String(now.getSeconds()).padStart(2, '0')

		// Tentukan AM atau PM
		const ampm = hours >= 12 ? 'PM' : 'AM'

		// Konversi ke format 12 jam
		hours = hours % 12
		hours = hours ? hours : 12 // jika jam == 0, ganti dengan 12

		// Menyusun waktu dalam format 12 jam: HH:MM:SS AM/PM
		setTime(`${hours}:${minutes}:${seconds} ${ampm}`)

		// Menentukan ucapan berdasarkan waktu
		if (hours >= 5 && hours < 12) {
			setGreeting("Good morning")
		} else if (hours >= 12 && hours < 18) {
			setGreeting("Good afternoon")
		} else {
			setGreeting("Good night")
		}
	}

	// Menggunakan useEffect untuk menjalankan fungsi updateClock setiap detik
	useEffect(() => {
		// Update clock pertama kali
		updateClock()

		// Set interval untuk memperbarui waktu setiap detik
		const intervalId = setInterval(updateClock, 1000)

		// Membersihkan interval ketika komponen unmount
		return () => clearInterval(intervalId)
	}, [])

	return (
		<div>
			<Sidebar />
			<div className='p-4 sm:ml-64'>
				<div className='flex justify-center items-center pt-28'>
					<div className='flex-col gap-3'>
						<Image src={Cloud.src} width={450} height={450} alt='picture cloudz' />
						<h3 className='capitalize font-bold text-lg text-center'>{greeting}, what you want to note?</h3>

						{/* Menampilkan jam digital dengan AM/PM */}
						<div className="text-center mt-5">
							<h2 className="text-4xl font-mono">{time}</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
