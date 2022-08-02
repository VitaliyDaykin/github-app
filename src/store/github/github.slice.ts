import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    usersList: [],
    currentUserData: null,
    isLoading: false,
};

export const fetchSearchusers = createAsyncThunk(
    "users/fetchByIdStatus",
    async (search: string) => {
        const response = await fetch(
            `https://api.github.com/search/users?q=${search}&per_page=5`
        );
        const data = await response.json();

        return data;
    }
);

export const getUserAdditionalInfo = createAsyncThunk(
    "users/getUserAdditionalInfo",
    async ({ url, repos_url }: any) => {
        const additinalDataUrls = [url, repos_url].map((urlToFetch) =>
            fetch(urlToFetch)
        );
        const responses = await Promise.all(additinalDataUrls);
        const datas = await Promise.all(
            responses.map((res) => {
                return res.json();
            })
        );
        return datas;
    }
);
export const githubSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearchusers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSearchusers.fulfilled, (state, { payload }) => {
            state.usersList = [...payload.items];
            state.isLoading = false;
        });
        builder.addCase(getUserAdditionalInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(
            getUserAdditionalInfo.fulfilled,
            (state, { payload }) => {
                const [userInfo, user_repos] = payload;
                state.currentUserData = { ...userInfo, user_repos };
                state.isLoading = false;
            }
        );
    },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
