/**
 * Парсер результатов, полученных от meetup API
 */
class MeetupParser {

    parse(data, onDone) {
        const events = data["events"].map(this.mapEvent).filter(it => it != null);

        if (onDone) {
            onDone(events);
        }
    }

    mapEvent(meetupEventItem) {
        if (meetupEventItem.visibility != 'public') {
            // только те события, для которых указаны все данные
            return null;
        }

        return ({
            "id": meetupEventItem.id,
            "name": meetupEventItem.name,
            "link": meetupEventItem.link,
            "description": meetupEventItem.description,
            "place": meetupEventItem.venue.country + ", " + meetupEventItem.venue.city + ", " + meetupEventItem.venue.address_1 + " @ " + meetupEventItem.venue.name,
            "timestamp": meetupEventItem.time
        });
    }

}