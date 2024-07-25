import axios from "axios";

import { ServerURL } from "../utils/constants";

const TMAPI = axios.create({
  baseURL: ServerURL,
  headers: {},
  withCredentials: true,
});

export default TMAPI;
