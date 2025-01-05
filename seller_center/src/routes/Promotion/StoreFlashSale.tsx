import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import StoreFlashSale from '../../components/Promotion/StoreFlashSale'

export const Route = createFileRoute('/Promotion/StoreFlashSale')({
  component: RouteComponent,
})

function RouteComponent() {
  return <StoreFlashSale/>
}
