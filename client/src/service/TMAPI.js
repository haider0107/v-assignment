import axios from "axios";

import { ServerURL } from "../utils/constants";

const TMAPI = axios.create({
  baseURL: ServerURL,
  headers: {},
});

export default TMAPI;
