import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, getUserProfile, updateUserProfile } from '../../services/apiService'

// ── Async thunks ──────────────────────────────────────────────────────────────

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password, rememberMe = false }, { dispatch, rejectWithValue }) => {
    try {
      const loginRes = await loginUser({ email, password })
      const token = loginRes.data.body.token

      dispatch(authSlice.actions.setToken(token))

      const profileRes = await getUserProfile()
      const user = profileRes.data.body

      return { user, rememberMe }
    } catch (err) {
      const status = err.response?.status
      const message =
        status === 400 || status === 401
          ? 'Invalid email or password.'
          : 'Server error, please try again later.'
      return rejectWithValue(message)
    }
  }
)

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserProfile()
      return res.data.body
    } catch (err) {
      const message =
        err.response?.data?.message || 'Session expired. Please sign in again.'
      return rejectWithValue(message)
    }
  }
)

export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfileAsync',
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      const res = await updateUserProfile(firstName, lastName)
      return res.data.body
    } catch (err) {
      const message =
        err.response?.data?.message || 'Could not update profile. Please try again.'
      return rejectWithValue(message)
    }
  }
)

// ── Slice ─────────────────────────────────────────────────────────────────────

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    clearError(state) {
      state.error = null
    },
    logout() {
      localStorage.removeItem('token')
      return initialState
    },
  },
  extraReducers: (builder) => {
    // loginAsync
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        if (action.payload.rememberMe) {
          localStorage.setItem('token', state.token)
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.token = null
      })

    // fetchUserProfile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        localStorage.removeItem('token')
      })

    // updateProfileAsync
    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user.firstName = action.payload.firstName
        state.user.lastName = action.payload.lastName
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer
