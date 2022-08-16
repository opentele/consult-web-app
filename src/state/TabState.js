import _ from "lodash";

class TabItemState {
    tabIndex;
    tabName;

    constructor(tabIndex, tabName) {
        this.tabIndex = tabIndex;
        this.tabName = tabName;
    }
}

class TabState {
    tabIndex;
    tabItems;
    updateIndex;

    static initialState(tabIndex, tabNames) {
        const map = new Map();
        tabNames.forEach((x, index) => map.set(index, new TabItemState(index, x, 0)));
        return new TabState(tabIndex, map, 0);
    }

    constructor(tabIndex, tabItems, updateIndex) {
        this.tabIndex = tabIndex;
        this.tabItems = tabItems;
        this.updateIndex = updateIndex;
    }

    clone() {
        const map = new Map();
        for (const [key, value] of this.tabItems.entries()) {
            map.set(key, new TabItemState(value.tabIndex, value.tabName));
        }
        return new TabState(this.tabIndex, map, this.updateIndex);
    }

    tabDataChanged() {
        this.updateIndex++;
    }

    getCurrentUpdateIndex() {
        return this.updateIndex;
    }

    tabChanged(tabId) {
        this.tabIndex = tabId;
        this.updateIndex++;
    }
}

export default TabState;
