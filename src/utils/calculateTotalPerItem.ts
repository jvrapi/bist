const calculateTotalPerItem = (price: number, amount: number) => {
  const total = parseFloat(price.toString()) * amount
  return total
}

export { calculateTotalPerItem }
