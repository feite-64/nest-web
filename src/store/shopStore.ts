import { defineStore } from 'pinia'
import { Data } from '@/type/shopType'
import { shopData } from '@/utils/LoginRequest'
export const useShopStore = defineStore('shop', {
  state: () => {
    return {
      shop: <Data[]>{}
    }
  },
  actions: {
    async getdata(id: number) {
      await shopData(id).then((res) => {
        this.shop = [res.data.data]
      })
    }
  },
  getters: {}
})
