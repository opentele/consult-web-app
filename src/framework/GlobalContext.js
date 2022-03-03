class GlobalContext {
    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}

export default new GlobalContext();
