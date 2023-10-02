import {createSlice} from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null,
        playersOnline: [],
        playersWhoWantsToPlay: [],
        invitedPlayers: [],
        room: null,
        error: null,
        abandoned: false
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.player = action.payload;
        },
        updatePlayersOnline: (state, action) => {
            state.playersOnline = action.payload;
        },
        updatePlayersWhoWantsToPlay: (state, action) => {
            state.playersWhoWantsToPlay = action.payload;
        },
        updateInvitedPlayers: (state, action) => {
            state.invitedPlayers = action.payload;
        },
        updateRoom: (state,action) => {
            state.room = action.payload;
        },
        updateError: (state,action) => {
            state.error = action.payload;
        },
        updateAbandoned: (state, action) => {
            state.abandoned = action.payload;
        }
    }
})

export const {updatePlayer,
    updatePlayersOnline,
    updatePlayersWhoWantsToPlay,
    updateInvitedPlayers,
    updateRoom,
    updateError,
    updateAbandoned} = playerSlice.actions;

export default playerSlice.reducer;