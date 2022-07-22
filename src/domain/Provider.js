import {AbstractEntity, i18n} from "consult-app-common";
import _ from 'lodash';

class Provider extends AbstractEntity {
    name;
    providerClientDisplay;

    static fromResources(resources) {
        if (_.isNil(resources)) return [];
        return resources.map(Provider.fromResource);
    }

    static fromResource(resource) {
        return AbstractEntity.copyFields(resource, new Provider(), ["name", "providerClientDisplay"]);
    }
}

export default Provider;
