import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
 {
    id: 'default-Paris',
    predictionPlace: {
      address: 'Paris, France',
      origin: new LatLng(48.85661, 2.3522),
      bounds: new LatLngBounds(new LatLng(49, 2.7), new LatLng(48.6,2)),
    },
  },
  {
    id: 'default-Lille',
    predictionPlace: {
      address: 'Lille, France',
      origin: new LatLng(50.62925, 3.057256),
      bounds: new LatLngBounds(new LatLng(50.8, 3.4), new LatLng(50.4, 2.6)),
    },
  },
  
  {
    id: 'default-Charleroi',
    predictionPlace: {
      address: 'Charleroi, Belgique',
      origin: new LatLng(50.41081, 4.444643),
      bounds: new LatLngBounds(new LatLng(50.6, 4.7), new LatLng(50.2, 4.1)),
    },
  },
];
