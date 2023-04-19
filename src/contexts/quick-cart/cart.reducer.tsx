import {
  Item,
  UpdateItemInput,
  addItemWithQuantity,
  removeItemOrQuantity,
  addItem,
  updateItem,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal,
  calculateTotalPrice,
} from "./cart.utils";

interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: "ADD_ITEM_WITH_QUANTITY"; item: Item; quantity: number }
  | { type: "REMOVE_ITEM_OR_QUANTITY"; id: Item["id"]; quantity?: number, updated_at: number }
  | { type: "ADD_ITEM"; id: Item["id"]; item: Item, updated_at: number }
  | { type: "UPDATE_ITEM"; id: Item["id"]; item: UpdateItemInput }
  | { type: "REMOVE_ITEM"; id: Item["id"], updated_at: number }
  | { type: "RESET_CART" };

export interface State {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  meta?: Metadata | null;
  updated_at?: Number | undefined,
}
export const initialState: State = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  meta: null,
  updated_at: undefined
};
export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM_WITH_QUANTITY": {
      
      const items = addItemWithQuantity(
        state.items,
        action.item,
        action.quantity
      );
      return {...generateFinalState(state, items), updated_at: Date.now()};
    }
    case "REMOVE_ITEM_OR_QUANTITY": {
      const items = removeItemOrQuantity(
        state.items,
        action.id,
        (action.quantity = 1)
      );
      return {...generateFinalState(state, items), updated_at: Date.now()};
    }
    case "ADD_ITEM": {
      const items = addItem(state.items, action.item);
      return {...generateFinalState(state, items), updated_at: Date.now()};
    }
    case "REMOVE_ITEM": {
      const items = removeItem(state.items, action.id);
      return {...generateFinalState(state, items), updated_at: Date.now()};
    }
    case "UPDATE_ITEM": {
      const items = updateItem(state.items, action.id, action.item);
      return {...generateFinalState(state, items), updated_at: Date.now()};
    }

    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
}

const generateFinalState = (state: State, items: Item[]) => {
  const totalUniqueItems = calculateUniqueItems(items);
  return {
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    total: calculateTotal(items),
    total_price: calculateTotalPrice(items),
    isEmpty: totalUniqueItems === 0,
  };
};
