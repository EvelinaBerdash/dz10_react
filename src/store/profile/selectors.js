import { tableFooterClasses } from "@mui/material"

export const selectName = (state) => state.profile.name
export const selectVisible = (state) => state.profile.visible
export const selectAuth = (state) => state.profile.isAuth
