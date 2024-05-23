import { RefObject, useEffect, useRef } from 'react'

export const useOnOutsideClick = (onClick: () => void): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (!ref?.current?.contains(e.target as Node)) {
        onClick()
      }
    }
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return ref
}
