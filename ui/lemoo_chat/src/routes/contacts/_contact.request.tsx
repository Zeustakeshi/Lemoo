import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contacts/_contact/request')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/contacts/request"!</div>
}
