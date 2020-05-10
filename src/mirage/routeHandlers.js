export function getPerson( schema, request ) {
    const { id:personId } = request.params;

    return schema.people.find( personId );
}

export function getFloor( schema, request ) {
    const { id:floorId } = request.params;

    return schema.floors.find( floorId );
}

export const getLayers = ( schema, { params } ) => 
    schema.layers.findBy({ floorId: params.floorId });