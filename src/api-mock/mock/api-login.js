const API_URL =
  process.env.API_URL || 'http://localhost:9000/molde/api/v1/login';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'form-data',
    // 'Authorization': 'Bearer ' + wer23r32r23352ewwety342t22gew24y5j3h2h3j465u4ytgeww
  },
});
