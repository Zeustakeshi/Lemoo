import { createFileRoute } from '@tanstack/react-router'
import ConfirmInfo from '../../components/Account/ConfirmInfo'

export const Route = createFileRoute('/Accout/ConfirmInfo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ConfirmInfo />
}
