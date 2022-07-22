import _ from "lodash";

class EntityCollection {
    static getEntity(collection, id) {
        return _.find(collection, (x) => x.id === id);
    }

    static getIds(collection) {
        return collection.map((x) => x.id);
    }

    static getEntities(collection, ids) {
        return _.filter(ids, (id) => id !== -1).map((id) => this.getEntity(collection, id));
    }
}

export default EntityCollection;
