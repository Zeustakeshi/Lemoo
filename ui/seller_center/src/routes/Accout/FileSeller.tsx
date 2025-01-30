
import { createFileRoute } from '@tanstack/react-router'
import FileSeller from '../../components/Account/FileSeller'
export const Route = createFileRoute('/Accout/FileSeller')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FileSeller  />
}
