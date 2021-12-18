const {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} = require("@reduxjs/toolkit");

const newsAdapter = createEntityAdapter({
  selectId: (news) => news.ID,
});

export const fetchNews = createAsyncThunk("news/getFetchNews", async () => {
  const res = await fetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json"
  );
  return res.json();
});

const newsSlice = createSlice({
  name: "news",
  initialState: newsAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, { payload }) => {
      state.status = "loading";
      newsAdapter.upsertMany(state, payload);
    });
  },
});

export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds,
} = newsAdapter.getSelectors((state) => state.news);

export default newsSlice.reducer;
