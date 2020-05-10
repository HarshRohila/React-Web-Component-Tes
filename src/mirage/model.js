import { Model, belongsTo, hasMany } from "miragejs";

export default {
    floor: Model.extend({
        colorByTypes: hasMany(),
    }),

    colorByType: Model.extend({
        floor: belongsTo(),
    }),

    layer: Model,
    datalayers: Model,
    geofences: Model,
    datageofences: Model,
    datalabels: Model,
    labels: Model,
    colorbytypes: Model,
    amenities: Model,
    person: Model
};