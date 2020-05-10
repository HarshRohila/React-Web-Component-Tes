import { Server, RestSerializer } from "miragejs"
import Models from './model';
import Fixtures from './fixtures/main';
import { getPerson, getFloor, getLayers } from "./routeHandlers";

export function makeServer({ environment = "development" } = {}) {

  let server = new Server({
    serializers: {
      application: RestSerializer.extend({
        root: false,
        embed: true
      })
    },
    environment,
    routes() {
      this.urlPrefix = 'https://api-trimble-engage-qa.trimble-app.us';    // make this `http://localhost:8080`, for example, if your API is on a different server
      this.namespace = '/qa';

      this.get('/people/:id', getPerson);
      this.get('/floors/entity/:id', getFloor);
      this.get('/floors/:floorId/layers', getLayers);

      this.get('/floors/:id/geofences', (schema, { params }) =>
        schema.geofences.findBy({ floorId: params.id }));

      this.get('/floors/:id/labels', (schema, { params }) =>
        schema.labels.findBy({ floorId: params.id }));

      this.get('/floors/:id/datalayers', (schema, { params }) => {
        return schema.datalayers.where(layer => (layer.floorId === params.id))
      });

      this.get('/floors/:id/datalabels', (schema, request) =>
        schema.datalabels.where(label => (label.floorId === request.params.id)));

      this.get('/floors/:id/datageofences', (schema, request) =>
        schema.datageofences.where(geofence => (geofence.floorId === request.params.id)));

      this.get('/floors/:floorId/colorbytypes', (schema, { params }) =>
        schema.colorbytypes.where(colorbytype => colorbytype.floorId === params.floorId));

      this.get('/floors/:id/amenities', (schema, { params }) =>
        schema.amenities.where(amenity => (amenity.floorId === params.id)));

      this.get('/buildings/:id/floors', (schema, { params }) =>
        schema.floors.where(floor => (floor.buildingId === params.id)));

      this.passthrough('https://api-trimble-engage-qa.trimble-app.us/qa/**');
      this.passthrough('https://roadrunner-large-floors.s3.amazonaws.com/**');
    },

    models: Models,

    fixtures: Fixtures,

    seeds(server) {
      server.loadFixtures(
        "people",
        "floors",
        "layers",
        "datalayers",
        "geofences",
        "datageofences",
        "datalabels",
        "labels",
        "colorbytypes",
        "amenities"
      );
    },
  })
  return server;
}