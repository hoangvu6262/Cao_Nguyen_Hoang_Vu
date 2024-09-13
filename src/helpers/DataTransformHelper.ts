// Define price ranges as an object
const priceRanges: { [key: string]: { min: number; max: number } } = {
    below_1_million: { min: 0, max: 1000000 },
    '1_to_2_million': { min: 1000000, max: 2000000 },
    '2_to_3_million': { min: 2000000, max: 3000000 },
    '3_to_5_million': { min: 3000000, max: 5000000 },
    '5_to_7_million': { min: 5000000, max: 7000000 },
    '7_to_10_million': { min: 7000000, max: 10000000 },
    default: { min: 0, max: Infinity },
}

// Define area ranges as an object
const areaRanges: { [key: string]: { min: number; max: number } } = {
    below_20: { min: 0, max: 20 },
    '20_to_30': { min: 20, max: 30 },
    '30_to_50': { min: 30, max: 50 },
    '50_to_60': { min: 50, max: 60 },
    '60_to_70': { min: 60, max: 70 },
    '70_to_80': { min: 70, max: 80 },
    default: { min: 0, max: Infinity },
}

// Get price range from the object
const getPriceRange = (priceRange: string) => {
    return priceRanges[priceRange] || priceRanges.default
}

// Get area range from the object
const getAreaRange = (areaRange: string) => {
    return areaRanges[areaRange] || areaRanges.default
}

const transformToArray = <T>(data: { [key: string]: T }): T[] => {
    return Object.values(data)
}

export { getPriceRange, getAreaRange, transformToArray }
