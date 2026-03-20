import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
      img: "https://humanlegion.com/wp-content/uploads/2023/08/small-chimeracompany-6-THELASTREDOUBT-cover.jpg",
      name: "Projectors",
      cost: 200,
      quantity: 0,
    },
    {
      img: "https://humanlegion.com/wp-content/uploads/2023/03/TimCTaylor_The_Good_Soldier_vejk_as_a_space_soldier_mchimp.jpg",
      name: "Speaker",
      cost: 35,
      quantity: 0,
    },
    {
      img: "https://humanlegion.com/wp-content/uploads/2023/03/TimCTaylor_the_last_redoubt_mchimp.jpg",
      name: "Microphones",
      cost: 45,
      quantity: 0,
    },
    {
      img: "https://humanlegion.com/wp-content/uploads/2023/09/chimera-dept9-vertical_400px.jpg",
      name: "Whiteboards",
      cost: 80,
      quantity: 0,
    },

    {
      img: "https://humanlegion.com/wp-content/uploads/2024/03/TD-3-1984-SQUARE-800px.jpg",
      name: "Signage",
      cost: 80,
      quantity: 0,
    },

  ],


  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) {
        item.quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  }});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
