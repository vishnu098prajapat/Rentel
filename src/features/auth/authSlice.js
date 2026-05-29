import { createSlice } from '@reduxjs/toolkit';

// Utility to fetch user from local storage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (typeof parsed === 'object' && parsed !== null) return parsed;
    }
  } catch (e) {
    console.error("Error reading currentUser from localStorage", e);
  }
  return null;
};

const getExistingUsers = () => {
  try {
    const usersStr = localStorage.getItem('users');
    if (usersStr) {
      const parsed = JSON.parse(usersStr);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Error reading users from localStorage", e);
  }
  return [];
};

const initialState = {
  isAuthenticated: !!getUserFromStorage(),
  user: getUserFromStorage(), 
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { email, password, fullName } = action.payload;
      
      const users = getExistingUsers();

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        state.error = 'User with this email already exists.';
        return;
      }

      // Create new user
      const parts = fullName ? fullName.split(' ') : ['Guest'];
      const newUser = {
        email,
        password, // In real app, never store plain text passwords
        firstName: parts[0],
        lastName: parts.slice(1).join(' ') || '',
        phone: '',
        location: '',
        bio: ''
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login after register
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      state.user = newUser;
      state.isAuthenticated = true;
      state.error = null;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      
      const users = getExistingUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        state.user = user;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password.';
      }
    },
    logout: (state) => {
      localStorage.removeItem('currentUser');
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    updateProfile: (state, action) => {
      const updatedData = action.payload;
      const updatedUser = { ...state.user, ...updatedData };
      
      // Update currentUser
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = getExistingUsers();
      const index = users.findIndex(u => u.email === state.user.email);
      if (index !== -1) {
        // Keep password intact
        users[index] = { ...users[index], ...updatedData };
        localStorage.setItem('users', JSON.stringify(users));
      }

      state.user = updatedUser;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { register, login, logout, updateProfile, clearError } = authSlice.actions;
export default authSlice.reducer;
