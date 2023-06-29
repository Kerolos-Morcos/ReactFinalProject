import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllPosts = createAsyncThunk("post/posts", async () => {
    try {
        let res = await axios.get('http://localhost:3500/post/posts');  
        console.log(res.data.data);
        return res.data.data;
    }
    catch (err) {
        console.log(err)
    }
})

export const setFilteredPosts = (filteredPosts) => {
    return {
      type: 'SET_FILTERED_POSTS',
      payload: filteredPosts
    };
  };

const PostSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        filteredPosts: [],
      
    },
    reducers: {
        search: (state, action) => {
            if (action.payload === "") {
              state.filteredPosts = [...state.posts];
            } else {
              state.filteredPosts = state.posts.filter(
                (post) =>
                  post.content.toLowerCase().includes(action.payload.toLowerCase()) ||
                  post.patientLocation.toLowerCase().includes(action.payload.toLowerCase())
              );
              console.log(state.filteredPosts);
            }
          },
    filter:(state , action) => {
     console.log(action.payload);
     state.filteredPosts = action.payload;
    }
},
    extraReducers: {
        [getAllPosts.pending]: (state) => {
            // console.log("pending");
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.filteredPosts = action.payload;
        },
        [getAllPosts.rejected]: (state, action) => {
            // console.log(action);
            console.log("rejected")
        },



        [setFilteredPosts.pending]: (state) => {
            // console.log("pending");
        },
        [setFilteredPosts.fulfilled]: (state, action) => {
            // state.posts = action.payload;
            state.filteredPosts = action.payload;
            console.log(action.payload);
        },
        [setFilteredPosts.rejected]: (state, action) => {
            // console.log(action);
            console.log("rejected")
        },
    }
})


export default PostSlice.reducer;
export const { search , filter } = PostSlice.actions;