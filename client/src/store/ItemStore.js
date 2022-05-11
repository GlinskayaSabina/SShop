import { makeAutoObservable } from "mobx";

export default class ItemStore {
  constructor() {
    this._types = [{ id: 1, name: "Вода, напитки" }];
    this._brands = [{ id: 1, name: "Святой источник" }];
    this._items = [{}];

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setItems(items) {
    this._items = items;
  }

  get Types() {
    return this._types;
  }
  get Brands() {
    return this._brands;
  }
  get Items() {
    return this._items;
  }
}
