import FPApi from './api';

// Post request with payload
function getFloorsData(apiName,floorId) {
    //const floorId = '1000544315CSID5041';
    return FPApi.fetchResource('floors/'+floorId+'/'+apiName, {
      method: 'GET',
    });
  }
export const getFloorLayers = (floorId) =>{
    return getFloorsData('layers', floorId).then(respone =>{
        return FPApi.fetchResource(respone.url, {
            method: 'GET',
          },false,false);
    });
}

export const getFloorAmenities = (floorId) =>{
    return getFloorsData('amenities', floorId);
}
export const getFloorLabels = (floorId) =>{
    return getFloorsData('labels', floorId).then(respone =>{
        return FPApi.fetchResource(respone.url, {
            method: 'GET',
          },false,false);
    });
}
export const getFloorColorbytypes = (floorId) =>{
    return getFloorsData('colorbytypes', floorId);
}
export const getFloorGeofences = (floorId) =>{
    return getFloorsData('geofences', floorId).then(respone =>{
        return FPApi.fetchResource(respone.url, {
            method: 'GET',
          },false,false);
    });
}
export const getFloors = (buildingId) =>{
    return FPApi.fetchResource('buildings/'+buildingId+'/floors', {
        method: 'GET',
      });
}
export const getFloorInfo = (floorId) =>{
    return FPApi.fetchResource('floors/entity/'+floorId,{
        method: 'GET',
      })
}
export const getColorBys = (floorId, colorById) => {
    return FPApi.fetchResource('floors/' + floorId + '/color-bys/' + colorById, {
        method: 'GET'
    });
}

export const getPerson = (person) => {

    const { id, spaceId, floorId } = person;
    let url = `people/${id}?floorId=${floorId}`;

    if ( spaceId ) {
        url += `&spaceId=${spaceId}`;
    }

    return FPApi.fetchResource(url);
    
}; 