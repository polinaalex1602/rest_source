/*
 * Вывод результатов.
 */
class TablePrinter {

    clear() {
        $("#lstErrors")[0].innerHTML = "";
        $("#tblEventsBody")[0].innerHTML = "";
    }

    showError(errMessage) {
        $("#lstErrors").append(`<li class="alert alert-warning">${errMessage}</li>`);
    }

    
    showEvents(events) {
        const $tableBody = $("#tblEventsBody");

        events.forEach((ev, index) => {
            const html = `<tr>
                <td>${index + 1}</td>
                <td><a href="${ev.link}">${ev.name}</a></td>
                <td>${ev.description}</td>
                <td>${this.formattedDate(ev.timestamp)}</td>
                <td>${ev.place}</td>
                </tr>
            `;

            $tableBody.append(html);
        });
    }

    formattedDate(timestamp) {
        return new Date(timestamp).toDateString();
    }

}