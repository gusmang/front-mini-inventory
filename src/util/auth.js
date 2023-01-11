const Token = "inv-dashboard"
const Profile = "inv-dashboard-profile"

export function getToken() {
    return localStorage.getItem(Token)
}

export function setToken(bearer) {
    return localStorage.setItem(Token, bearer)
}

export function getProfile() {
    const ProfileData = localStorage.getItem(Profile)
    if (ProfileData) {
        return JSON.parse(ProfileData)
    } else {
        return []
    }
}

export function setProfile(profile) {
    const ProfileData = JSON.stringify(profile)
    localStorage.setItem(Token+'-profile', ProfileData)
}

export function logOut() {
    localStorage.removeItem(Profile)
    localStorage.removeItem(Token)
}

