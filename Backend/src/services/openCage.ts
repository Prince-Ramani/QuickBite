export const isValidAddress = async (address: string): Promise<void> => {
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
      let location = data.results[0];
      let lat = data.location.geometry.lat;
      let lng = data.location.geometry.lng;

      return { valid: true, address: location, geometry = [lat, lng] };
    }

    return { valid: false };
  } catch (err) {
    console.log("Error in isValidAdress fucntion file opencage.ts : ", err);
    throw new Error("Error validationg address.");
  }
};
