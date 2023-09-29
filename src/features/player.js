import {createSlice} from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null,
        playersOnline: [],
        playerWhoWantsToPlay: null,
        invitedPlayer: null,
        isInvitationSent: false,
        room: []
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.player = action.payload;
        },
        updatePlayersOnline: (state, action) => {
            state.playersOnline = action.payload;
        },
        updatePlayerWhoWantsToPlay: (state, action) => {
            state.playerWhoWantsToPlay = action.payload;
        },
        updateInvitedPlayer: (state, action) => {
            state.invitedPlayer = action.payload;
        },
        updateIsInvitationSent: (state, action) => {
            state.isInvitationSent = action.payload;
        },
        updateRoom: (state,action) => {
            state.room = action.payload;
        }
    }
})

export const {updatePlayer,
    updatePlayersOnline,
    updatePlayerWhoWantsToPlay,
    updateInvitedPlayer,
    updateIsInvitationSent,
    updateRoom} = playerSlice.actions;

export default playerSlice.reducer;