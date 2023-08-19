import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";

export default function Map() {


    //Initial Map Region
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.334547282326014, 
    longitude: -122.00911805385397,
    latitudeDelta: 0.0009,
    longitudeDelta: 0.004,
  });

  return (
    <View style={styles.container}>

            {/* Map Component */}
        <MapView
            style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
          >
            {/* Had to hardcode markers since my free google maps api ran out while testing */}

            <Marker
                    title="uBreakiFix Cupertino"
                    description="We're Your Go-To for Mobile Woes"
                    coordinate={{"latitude":37.327654018629204,"longitude":-122.03833691344595 }}
                />
            <Marker
                    title="M.Y Phone Repairs"
                    description="Fixing Phones, One Smile at a Time"
                    coordinate={{"latitude":37.32892295025781,"longitude":-122.03317984395478 }}
                />

            <Marker
                    title="Cellular Repair Centers"
                    description="Cracked Screens, Happy Customers"
                    coordinate={{"latitude":37.31255933559616,"longitude":-121.93348405847343 }}
                />
            <Marker
                    title="ClickAway Computer + Phone + Network Repair"
                    description="Your Phone's Second Chance"
                    coordinate={{"latitude":37.36843131558033,"longitude":-122.030101901254 }}
                />
            <Marker
                    title="Apple Infinite Loop"
                    description="Turning Broken into Like-New"
                    coordinate={{"latitude":37.334240380876274,"longitude":-122.03053588908855 }}
                />
            <Marker
                    title="Phone Repair Shack Liq Store"
                    description="Don't Replace, Repair with Care"
                    coordinate={{"latitude":37.279943698484715,"longitude":-121.89220331458017 }}
                />
            <Marker
                    title="Apple Park Repair Center"
                    description="Revive, Repair, Repeat"
                    coordinate={{"latitude":37.33369987020252,"longitude":-122.00538796629121 }}
                />
            <Marker
                    title="Bay Area Phone Doctor LLC"
                    description="Your Mobile Lifesaver – We Fix It All"
                    coordinate={{"latitude":37.30818997146299,"longitude":-121.8991917676322 }}
                />
            <Marker
                    title="Clever Tech"
                    description="Bringing Life Back to Your Devices"
                    coordinate={{"latitude":37.38913073147153,"longitude":-121.89754372307765 }}
                />
        </MapView>
        </View>

  );
}
{/* Styles/CSS */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
