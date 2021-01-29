/*
 * Получение и валидация данных.
 */
class InputDataProvider {

    constructor(validator) {
        this._validator = validator;
    }

    getStartRangeDate() {
        return this.getDateValue("#dateRangeStart");
    }

    getEndRangeDate() {
        return this.getDateValue("#dateRangeEnd");
    }

    getSearchFilter() {
        return $("#txtSearchFilter")[0].value;
    }

 
    getCityIdentifier() {
        return $("#lstCities")[0].value;
    }

    getDateValue(elementId) {
        const $elementStartDate = $(elementId)[0];
        const d = $elementStartDate.value;
        return this._validator.resolveValidDate(d);
    }

}

class InputDataValidator {

    resolveValidDate(dateString) {
        try {
            const items = dateString.split("-");
            const year = +items[0] || 0;
            const month = +items[1] || 0;
            const day = +items[2] || 0;

            if (year == 0 || month == 0 || day == 0) return undefined;
            return new Date(year, month - 1, day);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

}


/**
 * Фиксированные данные о геопозиции городов
 */
class CityInfo {
    static geo = {
        "ny": {
            lon: -73.935242,
            lat: 40.730610
        },
        "sf": {
            lon: -122.431297,
            lat: 37.773972
        }
    }

    static lat(cityId) {
        return CityInfo.geo[cityId].lat;
    }

    static lon(cityId) {
        return CityInfo.geo[cityId].lon;
    }

}