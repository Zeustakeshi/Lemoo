
import { createFileRoute } from '@tanstack/react-router'
import Promotion from '../components/Promotion/Promotion'

export const Route = createFileRoute('/Promotion')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Promotion/>
}
