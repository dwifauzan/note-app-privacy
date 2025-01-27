"use client"
import React, { useState, useEffect } from 'react'
import { Typography, Grid2 } from '@mui/material'

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Grid2>
      <Typography fontSize={35} fontWeight={'bold'}>{time.toLocaleTimeString()}</Typography>
    </Grid2>
  )
}

export default Clock