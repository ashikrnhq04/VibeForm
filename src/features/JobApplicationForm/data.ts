export async function fetchCountries() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_COUNTRY_API_BASE_URL}/countries/positions`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const { data } = await response.json();
    return (
      data?.map((item: { name: string }) => ({
        text: item.name,
        value: item.name,
      })) || []
    );
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export async function fetchCities(country: string) {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const { data } = await response.json();
    return data.map((city: { name: string; value: string }) => ({
      text: city,
      value: city,
    }));
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export async function getCountries(
  setCountries: React.Dispatch<
    React.SetStateAction<{ text: string; value: string }[]>
  >
) {
  try {
    const data = await fetchCountries();
    setCountries(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return;
  }
}
