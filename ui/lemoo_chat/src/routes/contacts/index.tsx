import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contacts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/contacts/"!</div>
}
