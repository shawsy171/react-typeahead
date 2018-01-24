export const validateInput = (input, regex) => {
  return RegExp(regex).test(input);
}

export const filterCountries = (input, list) => {
  return list.filter((country) => {
    const re = new RegExp(input, "i");  
    return re.test(country.substring(0, input.length))
  })
}

export default validateInput;