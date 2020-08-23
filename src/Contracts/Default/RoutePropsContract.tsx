import { History, Location } from 'history';

export default interface RoutePropsContract {
    history: History,
    location: Location,
    match: Object
}