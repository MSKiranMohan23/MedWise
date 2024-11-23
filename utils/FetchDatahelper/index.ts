export const fetchData= async(url: string,
  successCallback : (data:any) =>void,
  errorCallback : (data:any) =>void,

)=> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      errorCallback(`Error fetching data: ${response.statusText}`);
      return
    }

    const data = await response.json();
    successCallback(data)
  } catch (error) {
    errorCallback(`Error fetching data: ${error}`);
  }
}
