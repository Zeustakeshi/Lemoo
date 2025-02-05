import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/_store/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/store/_store/dashboard"!</div>
}
