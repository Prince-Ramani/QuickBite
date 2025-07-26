interface ap {
  lng: string;
  lat: string;
  formatted: string;
  country: string;
  state: string;
  town: string;
}

interface isValidAddressInterface {
  isValid: boolean;
  addInfo: ap | null;
}
export const isValidAddress = async (
  address: string,
): Promise<isValidAddressInterface> => {
  const add = encodeURIComponent(address);
  if (!process.env.OPEN_CAGE_API_KEY) {
    console.log("OPEN_CAGE_API_KEY not found!");
    throw new Error("Error OPEN_CAGE_API_KEY not found! ");
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${add}&key=${process.env.OPEN_CAGE_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      let lat = result.geometry.lat;
      let lng = result.geometry.lng;
      let formatted = result.formatted;
      let state = result.components.state || "unknown state";
      let town = result.components.town || "unknown town";
      let country = result.components.country;
      return {
        isValid: true,
        addInfo: {
          lng,
          lat,
          formatted,
          country,
          state,
          town,
        },
      };
    }
    return { isValid: false, addInfo: null };
  } catch (err) {
    console.log("Error in isValidAdress fucntion file opencage.ts : ", err);
    throw new Error("Error validationg address.");
  }
};
