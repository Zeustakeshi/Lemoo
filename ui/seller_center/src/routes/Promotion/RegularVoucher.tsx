import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import RegularVoucher from '../../components/Promotion/RegularVoucher'

export const Route = createFileRoute('/Promotion/RegularVoucher')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <RegularVoucher />
    </>
  )
}
