import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfo from "./LocationInfo";

const Map = ({ eventData, center, zoom }) => {
  const [locationInformation, setLocationInformation] = useState(null);

  const markers = eventData.map((e) => {
    if (e.categories[0].id === "wildfires") {
      return (
        <LocationMarker
          lat={e.geometry[0].coordinates[1]}
          lng={e.geometry[0].coordinates[0]}
          onClick={() => setLocationInformation({ id: e.id, title: e.title })}
        />
      );
    }
    return null;
  });

  return (
    <div className="map">
      {/* API removed for security reasons */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: "API_KEY" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInformation && <LocationInfo info={locationInformation} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 41.5381,
    lng: -2.4447,
  },
  zoom: 5,
};

export default Map;
