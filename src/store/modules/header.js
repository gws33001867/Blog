const state = {
    seen_home: "" //header导航，logo是否可见
}
const mutations = {
    SET_SEEN_HOME: (state, seen_home) => {
        state.seen_home = seen_home
    }
}
const actions = {
    initHeader({
        commit
    }, flag) {
        commit("SET_SEEN_HOME", flag)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}