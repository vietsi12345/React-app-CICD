import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { MenuTable } from './MenuTable'


const orderStatus = [
  { label: "Đang treo", value: "PENDING" },
  { label: "Hoàn thành", value: "COMPLETED" },
  { label: "Tất cả", value: "ALL" }
]
export const Menu = () => {

  const [filterValue, setFilterValue] = useState();

  const handleFilter = (e, value) => {
    setFilterValue(value)
  }

  return (
    <div className='px-2'>
      <MenuTable />
    </div>
  )
}
