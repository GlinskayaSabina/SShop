import { makeAutoObservable } from "mobx";
import { deleteDeviceFromBasket } from "../http/itemAPI";
import { buy } from "../http/userAPI";

export default class BasketStoreStore {
  constructor() {
    this._totalPrice = 0;
    this._basket = [];
    makeAutoObservable(this);
  }

  async setDeleteItemBasket(item, isAuth = false) {
    if (isAuth) {
      await deleteDeviceFromBasket(item.id).then(() => {
        this._basket = this._basket.filter((i) => i.id !== item.id);
        this._totalPrice -= item.price * item.count;
      });
    } else {
      this._basket = this._basket.filter((i) => i.id !== item.id);
      this._totalPrice -= item.price * item.count;

      localStorage.setItem("basket", JSON.stringify(this._basket));
    }
  }

  setBasket(item, isAuth = false) {
    const checkDeviceInBasket = this._basket.findIndex((i) => i.id === item.id);
    if (checkDeviceInBasket < 0) {
      this._basket = [...this._basket, { count: 1, ...item }];
      let totalPrice = 0;
      this._basket.forEach(
        (item) => (totalPrice += Number(item.price * item.count))
      );
      this._totalPrice = totalPrice;
    }

    if (!isAuth) {
      localStorage.setItem("basket", JSON.stringify(this._basket));
    }
  }

  setDeleteAllDeviceFromBasket() {
    this._totalPrice = 0;
    return (this._basket = []);
  }

  setCountDevice(itemId, action, isAuth = false) {
    const itemInd = this._basket.findIndex((i) => i.id === itemId);
    const itemInState = this._basket.find((item) => item.id === itemId);
    if (action === "+") {
      const newItem = {
        ...itemInState,
        count: ++itemInState.count,
      };
      this._basket = [
        ...this._basket.slice(0, itemInd),
        newItem,
        ...this._basket.slice(itemInd + 1),
      ];
    } else {
      const newItem = {
        ...itemInState,
        count: itemInState.count === 1 ? 1 : --itemInState.count,
      };
      this._basket = [
        ...this._basket.slice(0, itemInd),
        newItem,
        ...this._basket.slice(itemInd + 1),
      ];
    }

    if (!isAuth) {
      localStorage.setItem("basket", JSON.stringify(this._basket));
    }

    let totalPrice = 0;
    this._basket.forEach(
      (item) => (totalPrice += Number(item.price * item.count))
    );
    this._totalPrice = totalPrice;
  }

  resetBasket() {
    this._basket = [];
    this._totalPrice = 0;
    localStorage.removeItem("basket");
    buy();
  }

  get Basket() {
    return this._basket;
  }

  get Price() {
    return this._totalPrice;
  }
}
