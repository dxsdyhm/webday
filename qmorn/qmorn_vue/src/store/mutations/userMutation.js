export const fetchUserMutation = {
    updateUserInfo (state, action) {
        state.userinfo = action
        state.lastUpdated = (new Date()).getTime()
    }
}