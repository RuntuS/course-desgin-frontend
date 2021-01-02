import axios from "axios"


axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
if(process.env.NODE_ENV === "DEVELOPMENT") {
    axios.defaults.baseURL = "http://127.0.0.1:8100"
    // axios.defaults.baseURL = "http://118.31.105.159:8100"
}else if(process.env.NODE_ENV === "PRODUCTION"){
    axios.defaults.baseURL = "http://127.0.0.1:8100"
}


export default axios;