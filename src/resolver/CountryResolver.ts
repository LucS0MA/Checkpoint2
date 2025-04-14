import { Country } from "../entities/Country"
import { CountryInput } from "../inputs/CountryInput"
import { Arg, Mutation, Query, Resolver } from "type-graphql"

@Resolver(Country)
class CountryResolver {
    @Query(() => [Country])
    async getAllCountries() {
        try {
            const countries = await Country.find({
                order: {
                    id: 'DESC',
                },
            })
            return countries
        }
        catch (error) {
            console.error({ 'Error getting all countries': error })
            throw new Error('Something wrong happened')
        }
    }

    @Query(() => [Country])
    async getCountriesByContinent(@Arg('continent') continent: string) {
        try {
            const countriesByContinent = await Country.find({
                where: {
                    continent: continent,
                },
            })
            return countriesByContinent
        }
        catch (error) {
            console.error({ 'Error getting all countries': error })
            throw new Error('Something wrong happened')
        }
    }

    @Query(() => Country)
    async getCountryById(@Arg('id') id: number) {
        try {
            const country = await Country.findOne({
                where: {
                    id
                },
            })
            return country
        }
        catch (error) {
            console.error({ 'Error getting the country': error })
            throw new Error('Something wrong happened')
        }
    }

    @Mutation(() => Country)
    async createNewCountry(@Arg('data') newCountryData: CountryInput) {
        try {
            const existingCountry = await Country.findOne({
                where: { code: newCountryData.code },
            })
            if (existingCountry) {
                throw new Error('a country already exist')
            }

            const newCountry = Country.create({ ...newCountryData })
            await newCountry.save()
            return newCountry
        }
        catch (error) {
            console.error('Something went wrong while creating the country :', error)
            throw new Error('Error while creating the country')
        }
    }
}

export default CountryResolver