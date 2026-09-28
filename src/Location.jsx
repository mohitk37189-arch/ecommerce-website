import { useEffect, useState } from "react";

function Location() {
  const [address, setAddress] = useState(
    localStorage.getItem("userAddress") || ""
  );

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // SEARCH WHEN USER TYPES
  // ==========================================

  useEffect(() => {
    const value = search.trim();

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchLocation(value);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  // ==========================================
  // LOCATION SEARCH
  // ==========================================

  const searchLocation = async (value) => {
    setLoading(true);

    try {
      const url =
        "https://photon.komoot.io/api/" +
        "?q=" +
        encodeURIComponent(value) +
        "&limit=10" +
        "&lang=en";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Location search failed");
      }

      const data = await response.json();

      console.log("PHOTON RESULTS:", data);

      const features = data.features || [];

      const formattedResults = features.map((item, index) => {
        const p = item.properties || {};
        const geometry = item.geometry || {};

        const coordinates = geometry.coordinates || [];

        return {
          id:
            item.properties?.osm_id ||
            `${index}-${coordinates.join("-")}`,

          name:
            p.name ||
            p.street ||
            p.city ||
            p.town ||
            p.village ||
            "Location",

          address: buildAddress(p),

          latitude: coordinates[1],
          longitude: coordinates[0],

          properties: p,
        };
      });

      setResults(formattedResults);
    } catch (error) {
      console.error("SEARCH ERROR:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // BUILD ADDRESS
  // ==========================================

  const buildAddress = (p) => {
    const parts = [
      p.name,
      p.housenumber,
      p.street,
      p.district,
      p.suburb,
      p.neighbourhood,
      p.village,
      p.town,
      p.city,
      p.county,
      p.state,
      p.postcode,
      p.country,
    ];

    const cleanParts = parts.filter(Boolean);

    return [...new Set(cleanParts)].join(", ");
  };

  // ==========================================
  // SELECT LOCATION
  // ==========================================

  const selectAddress = (item) => {
    const fullAddress = item.address || item.name;

    setAddress(fullAddress);

    // Save address
    localStorage.setItem(
      "userAddress",
      fullAddress
    );

    // Save coordinates
    localStorage.setItem(
      "userLocation",
      JSON.stringify({
        latitude: item.latitude,
        longitude: item.longitude,
      })
    );

    console.log("SELECTED LOCATION:", {
      address: fullAddress,
      latitude: item.latitude,
      longitude: item.longitude,
    });

    setSearch("");
    setResults([]);
    setShowBox(false);
  };

  // ==========================================
  // CURRENT GPS LOCATION
  // ==========================================

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Your browser does not support location."
      );
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const accuracy =
          position.coords.accuracy;

        console.log(
          "GPS Latitude:",
          latitude
        );

        console.log(
          "GPS Longitude:",
          longitude
        );

        console.log(
          "GPS Accuracy:",
          accuracy,
          "meters"
        );

        try {
          // ==========================================
          // REVERSE GEOCODING
          // ==========================================

          const url =
            "https://api.bigdatacloud.net/data/reverse-geocode-client" +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            "&localityLanguage=en";

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(
              "Reverse geocoding failed"
            );
          }

          const data = await response.json();

          console.log(
            "CURRENT LOCATION DATA:",
            data
          );

          // ==========================================
          // CREATE ADDRESS
          // ==========================================

          const parts = [
            data.locality,
            data.city,
            data.principalSubdivision,
            data.postcode,
            data.countryName,
          ];

          const cleanParts = parts.filter(
            Boolean
          );

          const fullAddress =
            cleanParts.length > 0
              ? [...new Set(cleanParts)].join(
                  ", "
                )
              : `GPS Location (${latitude.toFixed(
                  6
                )}, ${longitude.toFixed(6)})`;

          console.log(
            "FINAL ADDRESS:",
            fullAddress
          );

          // ==========================================
          // SAVE ADDRESS
          // ==========================================

          setAddress(fullAddress);

          localStorage.setItem(
            "userAddress",
            fullAddress
          );

          // ==========================================
          // SAVE GPS COORDINATES
          // ==========================================

          localStorage.setItem(
            "userLocation",
            JSON.stringify({
              latitude: latitude,
              longitude: longitude,
              accuracy: accuracy,
            })
          );

          // ==========================================
          // CLOSE POPUP
          // ==========================================

          setSearch("");
          setResults([]);
          setShowBox(false);
        } catch (error) {
          console.error(
            "REVERSE GEOCODING ERROR:",
            error
          );

          const fallback =
            `GPS Location (${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)})`;

          setAddress(fallback);

          localStorage.setItem(
            "userAddress",
            fallback
          );

          localStorage.setItem(
            "userLocation",
            JSON.stringify({
              latitude,
              longitude,
              accuracy,
            })
          );

          alert(
            "GPS location mil gayi hai, lekin address service se address nahi mila."
          );
        } finally {
          setLoading(false);
        }
      },

      // ==========================================
      // GPS ERROR
      // ==========================================

      (error) => {
        console.error(
          "GPS ERROR:",
          error
        );

        setLoading(false);

        if (error.code === 1) {
          alert(
            "Location permission denied.\n\nChrome me Location permission Allow karo."
          );
        } else if (error.code === 2) {
          alert(
            "Location unavailable.\n\nGPS/Wi-Fi location check karo."
          );
        } else if (error.code === 3) {
          alert(
            "Location request timeout.\n\nDobara try karo."
          );
        } else {
          alert(
            "Unable to get your current location."
          );
        }
      },

      // ==========================================
      // GPS SETTINGS
      // ==========================================

      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="location-wrapper">

      {/* LOCATION DISPLAY */}

      <div
        className="location-display"
        onClick={() =>
          setShowBox(!showBox)
        }
        title={
          address ||
          "Select your location"
        }
      >
        <div className="location-text">
          📍{" "}
          {address ||
            "Select your location"}
        </div>
      </div>

      {/* LOCATION POPUP */}

      {showBox && (
        <div className="location-popup">

          <h3>
            Select delivery location
          </h3>

          {/* CURRENT LOCATION BUTTON */}

          <button
            type="button"
            className="current-location-btn"
            onClick={getCurrentLocation}
            disabled={loading}
          >
            📍{" "}
            {loading
              ? "Getting your location..."
              : "Use my current location"}
          </button>

          <div className="or-text">
            OR
          </div>

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search village, area, road or city..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            autoComplete="off"
          />

          {/* LOADING */}

          {loading && (
            <p className="loading">
              Searching location...
            </p>
          )}

          {/* RESULTS */}

          <div className="location-results">

            {!loading &&
              search.trim().length >= 2 &&
              results.length === 0 && (
                <p className="no-result">
                  No location found
                </p>
              )}

            {results.map((item) => (
              <div
                className="location-result"
                key={item.id}
                onClick={() =>
                  selectAddress(item)
                }
              >

                <div className="result-icon">
                  📍
                </div>

                <div className="result-content">

                  <strong>
                    {item.name}
                  </strong>

                  <p>
                    {item.address}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
}

export default Location;