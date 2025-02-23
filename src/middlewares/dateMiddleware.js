const getToday = () => new Date().toISOString().split("T")[0];

export default getToday;