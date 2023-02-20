function fetchCountries(input) {
  return fetch(
    `https://restcountries.com/v2/name/${input}?fields=name,capital,population,flag,languages`
  ).then((resolve, reject) => {
    if (resolve.status == 404) {
      //throw new Error('Oops, there is no country with that name');
      throw new Error('Oops, there is no country with that name');
    }
    return resolve.json();
  });
}
export { fetchCountries };
