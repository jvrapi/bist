export const numberToReal = (value: number) => {
  const number = value.toFixed(2).split('.')
  number[0] = 'R$ ' + number[0].split(/(?=(?:...)*$)/).join('.')
  return number.join(',')
}
