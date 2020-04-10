import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:9000/molde/api/v1",
    headers: {
        "Content-type": "application/json",
    }
});
