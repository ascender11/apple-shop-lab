import type { Slide } from './types'

export const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'APPLE IPAD 13 M4',
    specs: ['Ultra Retina XDR display', '16-core neural engine', '38.99 Wh battery'],
    image: '/home/iPadPro13.png',
    backgroundColor: '#1a2332',
    color: '#ffffff',
  },
  {
    id: 2,
    title: 'APPLE IPHONE 16',
    specs: ['Display: 6.1" OLED - 1179 x 2556', 'Chip: Apple A18', 'Battery: 3477 mAh'],
    image: '/home/iPhone16.png',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
  {
    id: 3,
    title: 'APPLE IPHONE 16 PRO MAX',
    specs: ['Display: 6.9" OLED - 1320 x 2868', 'Chip: Apple A18 Pro', 'Battery: 4676 mAh'],
    image: '/home/iPhone16ProMax.png',
    backgroundColor: '#1a2332',
    color: '#ffffff',
  },
  {
    id: 4,
    title: 'APPLE WATCH SERIES 10',
    specs: ['Up to 18 hours of battery life', '64 GB built-in storage', 'Thickness 9.7 mm'],
    image: '/home/AppleWatchSeries10.png',
    backgroundColor: '#f8d7d7',
    color: '#1a1a1a',
  },
  {
    id: 5,
    title: 'APPLE IPAD PRO 11 M4',
    specs: ['Ultra Retina XDR display', '10-core GPU', '38.99 Wh battery'],
    image: '/home/iPadPro11.png',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
]

export const ADVANTAGES = [
  {
    icon: '/home/discount-emoji.png',
    title: 'Promotions and gifts',
    description: 'Regular promotions, bonuses and discounts. buy apple products at the best prices',
    gradient: 'linear-gradient(180deg, #fe94a6 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/wallet-emoji.png',
    title: 'Convenient payment methods',
    description: 'Cash or card on delivery, online payment or credit',
    gradient: 'linear-gradient(180deg, #7de9ff 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/delivery-emoji.png',
    title: 'Delivery in 3 hours',
    description:
      'Fast and free delivery in moscow. delivered in 3 hours on the day of order. fast delivery across russia or pickup is also available',
    gradient: 'linear-gradient(180deg, #e685ff 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/bank-emoji.png',
    title: 'Credit purchase',
    description: 'Get the best credit offer from more than 30 leading banks in the country',
    gradient: 'linear-gradient(180deg, #ffe685 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/approval-emoji.png',
    title: 'Warranty',
    description: 'All products on our website have a warranty from our store or apple',
    gradient: 'linear-gradient(180deg, #52d116 0%, #f2f2f2 100%)',
  },
]
