const getters = {
    roles: (state) => state.auth.roles,
    // token: (state) => state.auth.token,
    token: () => localStorage.getItem('Admin-Token'),
    profile: (state) => state.auth.profile
}

export default getters