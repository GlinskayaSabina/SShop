import { makeAutoObservable } from "mobx";

export default class ItemStore {
  constructor() {
    this._types = [
      { id: 3, name: "Вода, напитки" },
      { id: 4, name: "Сладости" },
    ];
    this._brands = [{ id: 1, name: "Святой источник" }];
    this._items = [{}];
    this._selectedType = {};

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
  setSelectedType(type) {
    this._selectedType = type;
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
  get selectedType() {
    return this._selectedType;
  }
}
