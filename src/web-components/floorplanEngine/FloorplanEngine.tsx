import React from 'react';
import Style from 'style-it';

import {
    getFloorLayers, getFloorAmenities, getFloorLabels,
    getFloorColorbytypes, getFloorGeofences, getFloors, getFloorInfo, getColorBys, getPerson
} from './../../utils/floorplan';
import FPApi from './../../utils/api';

interface IState {
    floor: any,
    errorResponse: any,
    isFloorLoading: boolean,
    isColorBysLoading: boolean,
    colorBys: any,
  }
class FloorplanEngine extends React.Component<{ config: any }>{
    state: IState;
    constructor(props: Readonly<{ config: any }>) {
        super(props);
        this.state = {
            floor: null,
            errorResponse: null,
            isFloorLoading: false,
            isColorBysLoading: false,
            colorBys: null,
        };
        console.log('FloorplanEngine constructor called');
    }

    componentDidUpdate(prevProps: any) {

        const { config } = this.props;
        if (config && config.floorplanConfig &&
            config.floorplanConfig.init &&
            (!prevProps.config || config.floorplanConfig.init.authHeaders.jwt !== prevProps.config.floorplanConfig.init.authHeaders.jwt)) {

            this.initFPApi();
            const floorId = config.floorplanConfig.init.floorId;
            this.getFloor(floorId).then((floor) => {
                this.setState({ floor });
            })
                .catch(err => { this.setState({ errorResponse: err }) })
                .finally(() => this.setState({ isFloorLoading: false }));
        }
    }
    initFPApi() {
        const { orgId, jwt } = this.props.config.floorplanConfig.init.authHeaders;
        FPApi.setOrgId(orgId);
        FPApi.setXJwtAssertion(jwt);
    }

    getFloor = (floorId: string) => {
        const promise = new Promise((resolve, reject) => {

            return getFloorInfo(floorId).then(floorInfo => {
                const floorInfoId = floorInfo.id;
                const layers = getFloorLayers(floorInfoId);
                const geofences = getFloorGeofences(floorInfoId);
                const labels = getFloorLabels(floorInfoId);

                const config = this.props.config.floorplanConfig.init.floorplanConfig;

                let amenities = Promise.resolve([]);
                if (!config.amenities.disable) {
                    amenities = getFloorAmenities(floorInfoId);
                }

                let colorbyTypes = Promise.resolve([]);
                if (!config.colorBy.disable) {
                    colorbyTypes = getFloorColorbytypes(floorInfoId);
                }

                let floors = Promise.resolve([]);
                if (!config.disableFloorSwticher) {
                    floors = getFloors(floorInfo.buildingId);
                }
                const colorByTypeId = this.props.config.floorplanConfig.init.floorplanConfig.colorBy.defaultColorByType;
                if (colorByTypeId) {
                    this.setState({ isColorBysLoading: true });
                    // this.getColorbys(floorInfoId, colorByTypeId).then(colorBys => {
                    //     this.setState({ colorBys, isColorBysLoading: false });
                    // }).catch(err => {
                    //     this.setState({ errorResponse: err });
                    // });
                }
                // const hr = config.floorplanConfig.init.floorplanConfig.hr;
                // let hrPromise: Promise<unknown>;
                // if (hr) {
                //     this.props.config.floorplanConfig.init.floorplanConfig.geofenceId = '';    //clear geofenceId if  HR ID present

                //     const floorId = floorInfoId.split('CSID')[0];
                //     const hrWithFloorId = { ...hr, floorId };
                //     //hrPromise = this.getHR(hrWithFloorId);
                // }

                Promise.all([layers, geofences, labels, amenities, colorbyTypes, floors])
                    .then(([layers, geofences, labels, amenities, colorbyTypes, floors]) => {
                        resolve({ floorInfo, layers, geofences, labels, amenities, colorbyTypes, floors });
                    })
                    .catch(err => {
                        reject(err);
                    });
            }).catch(err => {
                this.setState({ errorResponse: err });
            });
        });

        return promise;
    }


    render() {
        console.log('render called', this.state.floor);
        return <>
            <Style>
                {`
              h2 {
                font-size: 40px;
              }
            `}
            </Style>
            <h2>floorplan engine</h2>
            {this.props.config && this.props.config.init && <p>{this.props.config.init.name}</p>}
        </>
    }

    componentWillUnmount() {
        console.log('FloorplanEngine will unmount called')
    }
}

export default FloorplanEngine;