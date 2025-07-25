import { create } from 'zustand';

interface DeliveryForm {
  name: string;
  phone1: string;
  phone2: string;
  phone3: string;
  postcode: string;
  address: string;
  addressDetail: string;
  isDefault: boolean;
  deliveryType: 'recent' | 'new';
}

interface PayForm {
  depositor: string;
  selectedBank: string;
}

interface OrderStore {
  delivery: DeliveryForm;
  payment: PayForm;
  updateDelivery: (key: keyof DeliveryForm, value: string | boolean) => void;
  updatePayment: (key: keyof PayForm, value: string) => void;
  resetForm: () => void;
  resetDelivery: () => void;
}

const defaultState: OrderStore['delivery'] = {
  name: '',
  phone1: '010',
  phone2: '',
  phone3: '',
  postcode: '',
  address: '',
  addressDetail: '',
  isDefault: false,
  deliveryType: 'new',
};

const defaultPayState: OrderStore['payment'] = {
  depositor: '',
  selectedBank: '',
};

export const useOrderStore = create<OrderStore>((set) => ({
  delivery: { ...defaultState },
  payment: { ...defaultPayState },
  updateDelivery: (key, value) => set((state) => ({ delivery: { ...state.delivery, [key]: value } })),
  updatePayment: (key, value) => set((state) => ({ payment: { ...state.payment, [key]: value } })),
  resetForm: () => set({ delivery: { ...defaultState }, payment: { ...defaultPayState } }),
  resetDelivery: () =>
    set(() => ({
      delivery: {
        ...defaultState,
        deliveryType: 'new',
      },
    })),
}));
