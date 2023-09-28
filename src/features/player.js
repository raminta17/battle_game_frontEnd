import {createSlice} from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null,
        playersOnline: []
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.player = action.payload;
        },
        updatePlayersOnline: (state,action) => {
            state.playersOnline = action.payload;
        }
    }
})

export const {updatePlayer, updatePlayersOnline} = playerSlice.actions;

export default playerSlice.reducer;