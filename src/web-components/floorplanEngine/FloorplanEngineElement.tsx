import ReactDOM from 'react-dom';
import React from 'react';
import FloorplanEngine from './FloorplanEngine';
import '@webcomponents/custom-elements';
import '@webcomponents/webcomponentsjs';

export default class WComp extends HTMLElement {
    config: any;

    private mountPoint!: HTMLDivElement;

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.mountPoint) {
            this.mountPoint = document.createElement('div');
            this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
        }

        ReactDOM.render(
            <React.StrictMode>
                <FloorplanEngine config={this.config} />
            </React.StrictMode>,
            this.mountPoint
        );
    }

    set prop(prop: any) {
        console.log('got it', prop);
        this.config = prop;
        if (!prop) {
            this.config = {
                floorplanConfig: {
                    init: {
                        authHeaders: {
                            orgId: '7',
                            jwt: 'eyJraWQiOiJNamsxTWpFeFltRXRaRE00TmkwME1qVmhMV0UzWVRBdE5EazRNbUk1TjJRNVkyWXciLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1ODc0NTIzNDQsImp0aSI6Ik16TkZMdGxmNmJlMkk3WU5kd19sUFEiLCJpYXQiOjE1ODc0NDg3NDQsImlzcyI6Imh0dHBzOi8vcmVhbGVzdGF0ZS50cmltYmxlLmNvbSIsImFjY291bnR1c2VybmFtZSI6InRqIiwiZW1haWxhZGRyZXNzIjoidGVkX2plbm5leUB0cmltYmxlLmNvbSIsImZpcnN0bmFtZSI6IlRlZCIsImxhc3RuYW1lIjoiSmVubmV5In0.lA4YsRgABw5bl2_5o4NmjJZGO3Nn-lqTlysJBu_bF1i7UAVK8QBVupiW4dtpKMn3J0CPPn-2_ioLRsdQ-KkfCEqaBNKaWi2lJjG8cNYbYA-D2dfA89MQWy2UIxB9qE4ToDoyp3SeOc4DyA4GrUMJ-wAq51KxelNnGOK441IITLczBieAkesak5cnPNKmZmZTv4W6Js5rm3eqogWmB4AYwz31XTvkuwGSSGrhvSDiEhMQEPhYnrH6uBpQmc3OykyRZcHcGBBaSxYW-bODkRv1Ut30lHXmaNgWUOch65iwrH0XswXY49_pKRF8e4MCrhIgRKutyj-oVkT7GMi68ZVCEA',
                        },

                        floorId: '2d58530d-1a0d-4db5-81cc-cf377659279c',

                        floorplanConfig: {
                            // For basis purpose only

                            colorBy: {
                                disable: false,
                                colorMap: [],//preferred over colorBy
                                defaultColorByType: '',
                            },

                            uiElements: {
                                disableZoom: false,
                                disableRotation: false,
                                disableResetFloorButton: false,
                            },

                            amenities: {
                                disable: true,
                                defaultAmenities: [],
                            },

                            disableTray: false,
                            disableFloorSwticher: false,
                            enableDisplayDateTime: false,

                            geofenceId: '0e009af6-27fe-413f-9e7a-caf63ccd3380', //to highlight
                            hr: {
                                id: '1b78b83b-5bb0-4ad8-ad19-ee9052f568d9',
                                spaceId: '0e009af6-27fe-413f-9e7a-caf63ccd3380'
                            },

                            rotationAngle: 60,
                        }
                    },
                    floorplanInfo: {
                        layers: [],
                        geofences: [],
                        labels: [],

                    },
                    hooks: {
                        onColorByTypeClick: (colorByType: string, floorId: string) => { console.log('colorByType = ' + colorByType + ' floorId=' + floorId); },
                        onFloorClick: (floorId: string) => { console.log('floorId = ' + floorId); },
                        onAmenitiesChanged: (amenities: any) => { console.log(amenities); },
                        onHighlightSpace: (spaceId: string) => { console.log('spaceId = ' + spaceId); },
                        onError: (error: string) => { console.log(error); }
                    }
                }
            }
        }
        this.render();
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }
}
