import type { Slide } from './types'

export const SLIDES: Slide[] = [
  {
    id: 1,
    translationKey: 'ipadPro13',
    image: '/home/iPadPro13.png',
    backgroundColor: '#1a2332',
    color: '#ffffff',
  },
  {
    id: 2,
    translationKey: 'iphone16',
    image: '/home/iPhone16.png',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
  {
    id: 3,
    translationKey: 'iphone16ProMax',
    image: '/home/iPhone16ProMax.png',
    backgroundColor: '#1a2332',
    color: '#ffffff',
  },
  {
    id: 4,
    translationKey: 'appleWatchSeries10',
    image: '/home/AppleWatchSeries10.png',
    backgroundColor: '#f8d7d7',
    color: '#1a1a1a',
  },
  {
    id: 5,
    translationKey: 'ipadPro11',
    image: '/home/iPadPro11.png',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
] satisfies Slide[]

import type { Advantage } from './types'

export const ADVANTAGES = [
  {
    icon: '/home/discount-emoji.png',
    translationKey: 'promotions',
    gradient: 'linear-gradient(180deg, #fe94a6 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/wallet-emoji.png',
    translationKey: 'payment',
    gradient: 'linear-gradient(180deg, #7de9ff 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/delivery-emoji.png',
    translationKey: 'delivery',
    gradient: 'linear-gradient(180deg, #e685ff 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/bank-emoji.png',
    translationKey: 'credit',
    gradient: 'linear-gradient(180deg, #ffe685 0%, #f2f2f2 100%)',
  },
  {
    icon: '/home/approval-emoji.png',
    translationKey: 'warranty',
    gradient: 'linear-gradient(180deg, #52d116 0%, #f2f2f2 100%)',
  },
] satisfies Advantage[]
