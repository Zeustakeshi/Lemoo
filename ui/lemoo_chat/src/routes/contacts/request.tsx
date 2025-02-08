import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contacts/request')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/contacts/request"!</div>
}
