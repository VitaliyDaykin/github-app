import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_USREP_KEY = "rurk";

interface GithubState {
    userRepository: string[];
}

const initialState: GithubState = {
    userRepository: JSON.parse(localStorage.getItem(LS_USREP_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
    name: "github",
    initialState,
    reducers: {
        addRepository(state, action: PayloadAction<string>) {
            state.userRepository.push(action.payload);
            localStorage.setItem(
                LS_USREP_KEY,
                JSON.stringify(state.userRepository)
            );
            console.log(action);
        },
        removeRepository(state, action: PayloadAction<string>) {
            state.userRepository = state.userRepository.filter(
                (f) => f !== action.payload
            );
            localStorage.setItem(
                LS_USREP_KEY,
                JSON.stringify(state.userRepository)
            );
        },
    },
});

export const githubActions = githubSlice.actions;
export const githubReduser = githubSlice.reducer;
