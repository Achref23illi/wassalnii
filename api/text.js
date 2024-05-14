import axios from "axios";

const test = async () => {
  const res = await axios.get("http://172.23.4.144:8080/test");
  console.log(res.data);
};
export default test;
