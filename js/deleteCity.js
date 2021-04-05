function deleteCity(obj) {
  let onSuccess = () => {
    obj.parentElement.parentElement.remove();
  }

  let onFail = (e) => {
    alert(e);
  }
  
  console.log(obj.parentElement.querySelector("h4").textContent);

  fetchDeleteCity(obj.parentElement.querySelector("h4").textContent).then(onSuccess).catch(onFail)
}
