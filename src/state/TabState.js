import _ from "lodash";

class TabItemState {
    tabIndex;
    tabName;
    updateIndex;

    constructor(tabIndex, tabName, updateIndex) {
        this.tabIndex = tabIndex;
        this.tabName = tabName;
        this.updateIndex = updateIndex;
    }
}

class TabState {
    tabIndex;
    tabItems;

    static initialState(tabIndex, tabNames) {
        const map = new Map();
        tabNames.forEach((x, index) => map.set(index, new TabItemState(index, x, 0)));
        return new TabState(tabIndex, map);
    }

    constructor(tabIndex, tabItems) {
        this.tabIndex = tabIndex;
        this.tabItems = tabItems;
    }

    clone() {
        const map = new Map();
        for (const [key, value] of this.tabItems.entries()) {
            map.set(key, new TabItemState(value.tabIndex, value.tabName, value.updateIndex));
        }
        return new TabState(this.tabIndex, map);
    }

    tabDataChanged() {
        const tabItemState = this.tabItems.get(this.tabIndex);
        tabItemState.updateIndex = tabItemState.updateIndex + 1;
    }

    getCurrentUpdateIndex() {
        const tabItemState = this.tabItems.get(this.tabIndex);
        return tabItemState.updateIndex;
    }
}

export default TabState;
