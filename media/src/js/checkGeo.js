export default function checkGeolocation (inputValue) {
    let newValue;
    const validObj = {};
  
    if (inputValue.startsWith("[") && inputValue.endsWith("]")) {
      newValue = inputValue.slice(1, inputValue.length - 1).split(",");
    } else {
      newValue = inputValue.split(",");
    }
  
    if (newValue.length !== 2) return validObj;
    const latitude = parseFloat(newValue[0].trim());
    const longitude = parseFloat(newValue[1].trim());
  
    if (!Number.isNaN(latitude) && Math.abs(latitude) <= 90) {
      validObj.latitude = latitude;
    }
  
    if (!Number.isNaN(longitude) && Math.abs(longitude) <= 180) {
      validObj.longitude = longitude;
    }
  
    return validObj;
  }