const API = import.meta.env.VITE_API_DEV;

export const getAll = async (searchTerm?: string, isAdmin: boolean = false) => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (isAdmin) params.append("isAdmin", "true");

    const response = await fetch(`${API}/products?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.payload.message);
    return result;
  } catch (error) {
    console.error("[getAll]", error);
    throw error;
  }
};

export const getByCategoryId = async (id: string) => {
  try {
    const response = await fetch(`${API}/products/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.payload.message);
    return result;
  } catch (error) {
    console.error("[getByCategoryId]", error);
    throw error;
  }
};

export const getById = async (id: string) => {
  try {
    const response = await fetch(`${API}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.payload.message);
    return result;
  } catch (error) {
    console.error("[getById]", error);
    throw error;
  }
};

export const create = async (data: FormData) => {
  try {
    const response = await fetch(`${API}/products`, {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.payload.message);
    return result;
  } catch (error) {
    console.error("[create]", error);
    throw error;
  }
};
