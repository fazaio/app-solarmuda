import router from "@/router";
import { alertController } from "@ionic/vue";
import ky from "ky";
const api = ky.create({
  prefixUrl: "https://api.solarmuda.com",
  headers: {
    "content-type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {

        const auth_info = JSON.parse(localStorage.getItem("auth_info") || '{}')

        console.log(auth_info);
        

        if (auth_info.token) {
          request.headers.set("Authorization", `Bearer ${auth_info.token}`);
        }else{
          router.push('/')
        }
      },
    ],
    beforeError: [
      (error) => {
        error.response.json().then((response) => {
         const alert = alertController.create({
            message: response.message,
            buttons: ['ok'] 
          }).then((res) => {
            res.present()
          })
        });
        return error;
      },
    ],
  },
});



export default api;
