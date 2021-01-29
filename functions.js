/*
 * Основной файл, который координирует работу по получению исходных данных, валидацию, выполнению запроса, получению и отображения результата
 */
class MeetupUseCase {

    static URI_TEMPLATE = "https://api.meetup.com/find/upcoming_events?lon=#LONGITUDE&lat=#LATITUDE&end_date_range=#END&start_date_range=#START&page=100";

    constructor() {
        this._inputDataProvider = new InputDataProvider(
            new InputDataValidator()
        );

        this._outputPrinter = new TablePrinter();

        this._requester = new ApiRequester(
            new MeetupParser()
        );
    }

    doRequest() {
        this._outputPrinter.clear();

        const startRange = this._inputDataProvider.getStartRangeDate();
        const endRange = this._inputDataProvider.getEndRangeDate();

        let hasErrors = false;
        if (!startRange) {
            this._outputPrinter.showError("Неверное начало периода")
            hasErrors = true;
        }
        if (!endRange) {
            this._outputPrinter.showError("Неверное окончание периода")
            hasErrors = true;
        }

        const now = new Date();
        if (startRange <= now) {
            this._outputPrinter.showError("Укажите даты в будущем");
            hasErrors = true;
        }

        if (endRange <= startRange) {
            this._outputPrinter.showError("Окончание периода должно быть позднее начала")
            hasErrors = true;
        }


        if (hasErrors) {
            return;
        }

        const text = this._inputDataProvider.getSearchFilter();
        const city = this._inputDataProvider.getCityIdentifier();

        const url = this.buildRequestUrl(startRange, endRange, text, city);
        this._requester.fetch(url,
            (data) => this.onResult(data, text),
            (err) => this.onError(err)
        );
    }

    
    onResult(data, filterQueryOrigin) {
        const query = filterQueryOrigin.toLowerCase();
        const filtered = data.filter(ev => {
            return ev.name.toLowerCase().indexOf(query) != -1 || ev.description.toLowerCase().indexOf(query) != -1
        });
        this._outputPrinter.showEvents(filtered);
    }

    onError(err) {
        this._outputPrinter.showError(err.errorDescription);
    }

    
    buildRequestUrl(startRange, endRange, text, city) {
        const placeAndTime = MeetupUseCase.URI_TEMPLATE.replace("#LONGITUDE", CityInfo.lon(city))
            .replace("#LATITUDE", CityInfo.lat(city))
            .replace("#START", this.formatInputDate(startRange))
            .replace("#END", this.formatInputDate(endRange))

        if (text && text.length) {
            return placeAndTime + "&text=" + text;
        } else {
            return placeAndTime;
        }
    }

    formatInputDate(date) {
        const isoS = date.toISOString();
        return isoS.substring(0, isoS.length - 5);
    }

}