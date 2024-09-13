export interface SearchCriteria {
    province: { code: string; name: string } | null
    district: District | null
    priceRange: string
    areaRange: string
}

export interface District {
    name: string
    type: string
    slug: string
    name_with_type: string
    path: string
    path_with_type: string
    code: string
    parent_code: string
}
