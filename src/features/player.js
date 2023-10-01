import {createSlice} from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null,
        onlinePlayer: null,
        playersOnline: [],
        playersWhoWantsToPlay: [],
        invitedPlayers: [],
        room: [],
        error: null
    },
    reducers: {
        updatePlayer: (state, action) => {
            state.player = action.payload;
        },
        updateOnlinePlayer: (state, action) => {
            state.onlinePlayer = action.payload;
        },
        updatePlayersOnline: (state, action) => {
            state.playersOnline = action.payload;
        },
        updatePlayersWhoWantsToPlay: (state, action) => {
            state.playersWhoWantsToPlay = action.payload;
        },
        removePlayersWhoWantsToPlay: (state, action) => {
            state.playersWhoWantsToPlay = state.playersWhoWantsToPlay.filter(player => player.username !== action.payload.username);
        },
        addInvitedPlayers: (state, action) => {
            state.invitedPlayers.push(action.payload);
        },
        removeInvitedPlayers: (state, action) => {
            state.invitedPlayers = state.invitedPlayers.filter(player => player.username !== action.payload.username);
        },
        updateRoom: (state,action) => {
            state.room = action.payload;
        },
        updateError: (state,action) => {
            state.error = action.payload;
        }
    }
})

export const {updatePlayer,
    updateOnlinePlayer,
    updatePlayersOnline,
    updatePlayersWhoWantsToPlay,
    removePlayersWhoWantsToPlay,
    addInvitedPlayers,
    removeInvitedPlayers,
    updateRoom,
    updateError} = playerSlice.actions;

export default playerSlice.reducer;