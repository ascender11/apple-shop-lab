import * as Slider from '@radix-ui/react-slider'
import { useEffect, useRef, useState } from 'react'

import { PRICE_ABS_MAX, PRICE_ABS_MIN } from '../model/constants'

interface PriceSliderProps {
  value: [number, number]
  onChange: (value: [number, number]) => void
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const parseInput = (raw: string): number | null => {
  if (raw === '') return null
  const n = Number(raw)
  return Number.isNaN(n) ? null : n
}

const COMMIT_DEBOUNCE_MS = 400

export const PriceSlider = ({ value, onChange }: PriceSliderProps) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value)
  const [minStr, setMinStr] = useState(String(value[0]))
  const [maxStr, setMaxStr] = useState(String(value[1]))

  const timerRef = useRef<number | undefined>(undefined)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  useEffect(() => {
    window.clearTimeout(timerRef.current)
    setLocalValue(value)
    setMinStr(String(value[0]))
    setMaxStr(String(value[1]))
  }, [value])

  const commit = (next: [number, number]) => {
    window.clearTimeout(timerRef.current)
    setLocalValue(next)
    onChangeRef.current(next)
  }

  const scheduleCommit = (next: [number, number]) => {
    window.clearTimeout(timerRef.current)
    setLocalValue(next)
    timerRef.current = window.setTimeout(() => onChangeRef.current(next), COMMIT_DEBOUNCE_MS)
  }

  const normalize = (minRaw: string, maxRaw: string): [number, number] => {
    let min = parseInput(minRaw) ?? PRICE_ABS_MIN
    let max = parseInput(maxRaw) ?? PRICE_ABS_MAX

    min = clamp(min, PRICE_ABS_MIN, PRICE_ABS_MAX)
    max = clamp(max, PRICE_ABS_MIN, PRICE_ABS_MAX)
    if (min > max) [min, max] = [max, min]

    return [min, max]
  }

  const handleSliderChange = (next: [number, number]) => {
    setLocalValue(next)
    setMinStr(String(next[0]))
    setMaxStr(String(next[1]))
    scheduleCommit(next)
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setMinStr(raw)

    const n = parseInput(raw)
    if (n !== null) {
      scheduleCommit([clamp(n, PRICE_ABS_MIN, PRICE_ABS_MAX), localValue[1]])
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setMaxStr(raw)

    const n = parseInput(raw)
    if (n !== null) {
      scheduleCommit([localValue[0], clamp(n, PRICE_ABS_MIN, PRICE_ABS_MAX)])
    }
  }

  const commitInputs = () => {
    const next = normalize(minStr, maxStr)
    setMinStr(String(next[0]))
    setMaxStr(String(next[1]))
    commit(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitInputs()
      e.currentTarget.blur()
    }
  }

  return (
    <div className="py-4">
      <p className="mb-4 font-semibold text-sm text-text-primary">Price</p>

      <div className="mb-5">
        <Slider.Root
          className="relative flex h-6 w-full touch-none select-none items-center"
          value={localValue}
          onValueChange={(next) => handleSliderChange(next as [number, number])}
          onValueCommit={(next) => commit(next as [number, number])}
          min={PRICE_ABS_MIN}
          max={PRICE_ABS_MAX}
          step={100}
        >
          <Slider.Track className="relative h-2 w-full grow rounded-full bg-border">
            <Slider.Range className="absolute h-full rounded-full bg-primary" />
          </Slider.Track>

          <Slider.Thumb
            className="block h-5 w-5 rounded-full border-2 border-primary bg-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Min price"
          />

          <Slider.Thumb
            className="block h-5 w-5 rounded-full border-2 border-primary bg-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Max price"
          />
        </Slider.Root>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 items-center gap-1 rounded-lg border border-border px-3 py-2">
          <span className="shrink-0 text-text-quinary text-xs">From</span>
          <input
            type="number"
            value={minStr}
            onChange={handleMinChange}
            onBlur={commitInputs}
            onKeyDown={handleKeyDown}
            min={PRICE_ABS_MIN}
            max={PRICE_ABS_MAX}
            className="w-full bg-transparent text-sm text-text-primary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="shrink-0 text-text-quinary text-xs">₽</span>
        </div>

        <div className="flex flex-1 items-center gap-1 rounded-lg border border-border px-3 py-2">
          <span className="shrink-0 text-text-quinary text-xs">To</span>
          <input
            type="number"
            value={maxStr}
            onChange={handleMaxChange}
            onBlur={commitInputs}
            onKeyDown={handleKeyDown}
            min={PRICE_ABS_MIN}
            max={PRICE_ABS_MAX}
            className="w-full bg-transparent text-sm text-text-primary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="shrink-0 text-text-quinary text-xs">₽</span>
        </div>
      </div>
    </div>
  )
}
