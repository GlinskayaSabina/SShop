import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createItem = async (item) => {
  const { data } = await $authHost.post("api/item", item);
  return data;
};

export const fetchItems = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/item", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneItem = async (id) => {
  const { data } = await $host.get("api/item/" + id);
  return data;
};

export const fetchDeleteDevice = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: `api/item/${id}`,
  });
  return data;
};

export const updateDevices = async (id, body) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/item/${id}`,
    data: body,
  });
  return data;
};

export const getAllDevicesInAdminPage = async (
  name,
  page = 1,
  filter = "All"
) => {
  const { data } = await $authHost({
    method: "GET",
    url: `api/item/search?page=${page}&name=${name}&filter=${filter}`,
  });
  return data;
};

export const addDeviceToBasket = async (device) => {
  const { data } = await $authHost.post("api/basket", device);
  return data;
};

export const getDeviceFromBasket = async () => {
  const { data } = await $authHost.get("api/basket");
  return data;
};

export const deleteDeviceFromBasket = async (id) => {
  const { data } = await $authHost.delete(`api/basket/${id}`);
  return data;
};
