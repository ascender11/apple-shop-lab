export interface Slide {
  id: number
  translationKey: 'ipadPro13' | 'iphone16' | 'iphone16ProMax' | 'appleWatchSeries10' | 'ipadPro11'
  image: string
  backgroundColor: string
  color: string
}

export interface Advantage {
  icon: string
  translationKey: 'promotions' | 'payment' | 'delivery' | 'credit' | 'warranty'
  gradient: string
}
