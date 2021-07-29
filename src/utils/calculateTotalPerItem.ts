const calculateTotalPerItem = (price: number, amount: number) => {
  const total = parseFloat(price.toString()) * amount
  return parseFloat(total.toFixed(2))
}

export { calculateTotalPerItem }
