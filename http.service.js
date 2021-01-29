/**
 * Выполнение сетевых запросов
 */
class ApiRequester {

    constructor(parser) {
        this._parser = parser;
    }

    fetch(url, onDone, onError) {
        try {
            $.ajax({
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Access-Control-Allow-Origin": true
                },
                url: url,
                crossDomain: true,
                success: (data) => {
                    console.log("API result=", data);
                    this._parser.parse(data, onDone);
                },
                error: (err) => {
                    console.log("API err", err);

                    onError({ "errorDescription": "Ошибка запроса" });
                }
            });
        } catch (e) {
            onError({ "errorDescription": e.message });
        }
    }

}