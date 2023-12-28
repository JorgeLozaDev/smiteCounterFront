import { createSlice } from '@reduxjs/toolkit';

export const godSlice = createSlice({
    name: 'god',
    initialState: {
      id: ''
    },
    reducers: {
      saveId: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      deleteId: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

export const { saveId, deleteId } = godSlice.actions;
export const godDetails = (state) => state.user;
export default godSlice.reducer;