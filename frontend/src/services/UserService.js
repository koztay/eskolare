// TODO : bunu daha sonra apiCall ile değiştir, error verince unauthorized hatası veriyor
import checkNetwork from "./NetworkCheckService";
import apiCall from "../services/api";
import { BASE_URL } from "../main";

export default {
  getUserDetail() {
    const url = `${BASE_URL}/api/users/me/`;
    // const url = `http://127.0.0.1:8000/tr/api/v1/events/calendar/?start=${startDate}&end=${endDate}`;

    apiCall
      .get(url)
      .then(response => {
        const data = JSON.stringify(response.data);
        console.log(`Gelen user data : ${data}`);
      })
      .catch(error => {
        console.log("Error => ", error, "Data => ", error.response.data);
      });
  }
};
