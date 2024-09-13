import { FC, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
    TextField,
    Button,
    Autocomplete,
    MenuItem,
    Select,
    Typography,
    Box,
} from '@mui/material'
import Provinces from '@/data/tinh_tp.json'
import Districts from '@/data/quan_huyen.json'
import { transformToArray } from '@/helpers/DataTransformHelper'
import { District, SearchCriteria } from '@/constants/TypesConstant'
import './styles.scss'

interface SearchFormProps {
    onSubmit: (criteria: SearchCriteria) => void
}

const priceRanges = [
    { label: 'Dưới 1 triệu', value: 'below_1_million' },
    { label: '1 triệu - 2 triệu', value: '1_to_2_million' },
    { label: '2 triệu - 3 triệu', value: '2_to_3_million' },
    { label: '3 triệu - 5 triệu', value: '3_to_5_million' },
    { label: '5 triệu - 7 triệu', value: '5_to_7_million' },
    { label: '7 triệu - 10 triệu', value: '7_to_10_million' },
]

const areaRanges = [
    { label: 'Dưới 20 m²', value: 'below_20' },
    { label: '20 m² - 30 m²', value: '20_to_30' },
    { label: '30 m² - 50 m²', value: '30_to_50' },
    { label: '50 m² - 60 m²', value: '50_to_60' },
    { label: '60 m² - 70 m²', value: '60_to_70' },
    { label: '70 m² - 80 m²', value: '70_to_80' },
]

const provinces = transformToArray(Provinces)
const districts = transformToArray(Districts)

const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
    const { handleSubmit, control, watch, setValue } = useForm<SearchCriteria>()
    const [filteredDistricts, setFilteredDistricts] = useState<District[]>([])

    const selectedProvince = watch('province')

    useEffect(() => {
        if (selectedProvince) {
            setFilteredDistricts(
                districts.filter((d) => d.parent_code === selectedProvince.code)
            )
            setValue('district', null)
        } else {
            setFilteredDistricts([])
        }
    }, [selectedProvince, setValue])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <Controller
                name="province"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                    return (
                        <Box className="form-container__select-container">
                            <Typography>Tỉnh thành</Typography>
                            <Autocomplete
                                {...field}
                                options={provinces}
                                className="form-container__autocomplete"
                                getOptionLabel={(option) => option?.name || ''}
                                isOptionEqualToValue={(option, value) =>
                                    option?.code === value?.code
                                }
                                onChange={(event, newValue) =>
                                    field.onChange(newValue)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Chọn tỉnh thành"
                                    />
                                )}
                            />
                        </Box>
                    )
                }}
            />

            <Controller
                name="district"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                    return (
                        <Box className="form-container__select-container">
                            <Typography>Quận huyện</Typography>
                            <Autocomplete
                                {...field}
                                options={filteredDistricts}
                                className="form-container__autocomplete"
                                getOptionLabel={(option) => option?.name || ''}
                                isOptionEqualToValue={(option, value) =>
                                    option?.code === value?.code
                                }
                                onChange={(event, newValue) =>
                                    field.onChange(newValue)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Chọn quận huyện"
                                        variant="outlined"
                                        disabled={!selectedProvince}
                                        className="form-container__input"
                                    />
                                )}
                            />
                        </Box>
                    )
                }}
            />
            <Controller
                name="priceRange"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box className="form-container__select-container">
                        <Typography>Khoảng giá</Typography>
                        <Select
                            {...field}
                            className="form-container__select"
                            placeholder="Select a District"
                        >
                            {priceRanges.map((price) => (
                                <MenuItem key={price.value} value={price.value}>
                                    {price.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                )}
            />

            <Controller
                name="areaRange"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Box className="form-container__select-container">
                        <Typography>Diện tích</Typography>
                        <Select {...field} className="form-container__select">
                            {areaRanges.map((area) => (
                                <MenuItem key={area.value} value={area.value}>
                                    {area.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                )}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="form-container__button"
            >
                Lọc tin
            </Button>
        </form>
    )
}

export default SearchForm
