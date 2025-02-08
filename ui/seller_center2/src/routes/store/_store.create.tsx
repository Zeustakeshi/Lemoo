import { createFileRoute } from '@tanstack/react-router'
import CreateStore from '../../modules/store/CreateStore'

export const Route = createFileRoute('/store/_store/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><CreateStore/></div>
}
