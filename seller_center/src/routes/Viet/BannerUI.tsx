import { createFileRoute } from '@tanstack/react-router'
import BannerUI from '../../components/BannerUI'

export const Route = createFileRoute('/Viet/BannerUI')({
  component: () => (
    <div>
      <BannerUI />
    </div>
  ),
})
