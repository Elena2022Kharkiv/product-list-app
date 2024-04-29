export const getCategory = async (url) => {

  const urlCategory = `${url}/category`;

  const response = await fetch(urlCategory);
  
  const dataCat = await response.json();  
  return dataCat;
}