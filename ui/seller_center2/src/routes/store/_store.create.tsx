import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/_store/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/store/_store/create"!</div>
}
