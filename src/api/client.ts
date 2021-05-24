const localStorageKey = "__token__";

function client<TReturn>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data: any = null,
  customConfig: RequestInit = {}
): Promise<TReturn> {
  const token = window.localStorage.getItem(localStorageKey);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  return window.fetch(`/api/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      logout();
      window.location.assign(window.location.href);

      return;
    }

    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();

      return Promise.reject(new Error(errorMessage));
    }
  });
}

const logout = () => {
  window.localStorage.removeItem(localStorageKey);
};

export default client;
