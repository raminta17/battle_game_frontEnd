import {createSlice} from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.player = action.payload;
        }
    }
})

export const {updatePlayer} = playerSlice.actions;

export default playerSlice.reducer;