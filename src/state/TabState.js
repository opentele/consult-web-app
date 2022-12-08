import _ from "lodash";

class TabItemState {
    tabIndex;
    tabName;

    constructor(tabIndex, tabName) {
        this.tabIndex = tabIndex;
        this.tabName = tabName;
    }
}

const consultationRoomTabIndexKey = "consultationRoomTabIndexKey";

class TabState {
    tabItems;
    updateIndex;

    static get rememberedTabIndex() {
        return localStorage.getItem(consultationRoomTabIndexKey);
    }

    static initialState(tabIndex, tabNames) {
        const map = new Map();
        tabNames.forEach((x, index) => map.set(index, new TabItemState(index, x, 0)));
        if (_.isNil(TabState.rememberedTabIndex))
            localStorage.setItem(consultationRoomTabIndexKey, tabIndex);
        return new TabState(map, 0);
    }

    get tabIndex() {
        return _.toNumber(TabState.rememberedTabIndex);
    }

    constructor(tabItems, updateIndex) {
        this.tabItems = tabItems;
        this.updateIndex = updateIndex;
    }

    clone() {
        const map = new Map();
        for (const [key, value] of this.tabItems.entries()) {
            map.set(key, new TabItemState(value.tabIndex, value.tabName));
        }
        return new TabState(map, this.updateIndex);
    }

    tabDataChanged() {
        this.updateIndex++;
    }

    getCurrentUpdateIndex() {
        return this.updateIndex;
    }

    tabChanged(tabId) {
        localStorage.setItem(consultationRoomTabIndexKey, tabId);
        this.updateIndex++;
    }
}

export default TabState;
