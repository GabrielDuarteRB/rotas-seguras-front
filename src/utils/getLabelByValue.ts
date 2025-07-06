export function getLabelByValue(options: { label: string; value: string }[], value: string | number) {
  const found = options.find(option => option.value === String(value))
  return found?.label || ''
}
