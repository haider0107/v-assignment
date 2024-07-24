import axios from "axios";

import { ServerURL } from "../utils/constants";

const TMAPI = axios.create({
  baseURL: "/api",
  headers: {},
});

export default TMAPI;
