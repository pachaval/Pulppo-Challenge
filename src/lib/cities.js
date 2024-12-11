let cachedCities = null;

export const fetchCities = async () => {
    if (cachedCities) {
        return cachedCities;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`, {
            cache: "force-cache",
        });
        cachedCities = await res.json();
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        cachedCities = [];
    }

    return cachedCities;
};
