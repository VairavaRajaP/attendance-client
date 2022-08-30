import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://192.168.1.5:8000/",
  // Default headers
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  // 10 second timeout...
  // timeout: 10000
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  // console.log(authToken);
  if (!authToken) return;
  request.headers["Authorization"] = "JWT " + authToken;
  // console.log(request.headers.Authorization);
  // apiClient.setHeader("Authorization", "JWT" + authToken);
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  console.log(data);
  return data ? { ok: true, data } : response;
  // return response ? response : null;
};

export default apiClient;
