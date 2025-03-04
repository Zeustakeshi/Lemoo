import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/promotion/vouchers/store-follower/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/promotion/vouchers/sotre-follower/"!</div>
}
