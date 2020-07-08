const getters = {
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    userId: state => state.user.userId,
    seen_home: state => state.header.seen_home
}

export default getters