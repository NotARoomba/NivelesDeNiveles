import { Server } from "socket.io";
import Report from "../models/report";
import { collections } from "./database.service";

export default async function checkInfo(io: Server) {
    // loop through all the sensors and check for any anomalies, adding each one to an incident that is close to the sensor OR make a new incident if there is no previous incident nearby, the number of reports (weight) should be a few times greater thena the users
    // then loop through all the reports and also add on to the incidents like the sensors, checking if there is a current incident or making a new one and adding on to the number of reports
    // finally for all the instances get the users that are within certain ranges of the center and emit a new locationData to the clients with the new sensor values
    /// the sensors should be on a websocket or polling every so ans so seconds to the server so that the server can use webhooks to mongo to check for the state changes
    // if the state changes for a sensor then a new incident is created, same for the ports and the webhooks connecting to mongodb
    // this function should move to webhooks or whenever a new incident is created it sends a warning to all the users nearby
    // TODO: repurpouse function to sendIncidents where takes in a socket and then gets all the incidents and for each user it emits a message to the user depending on the level of the incident or if it has changed
    if (collections.sensors && collections.reports && collections.incidents) {
        const reports: Report[] = (await collections.reports
            .find({})
            .toArray()) as unknown as Report[];
        const sensor: Report[] = (await collections.reports
            .find({})
            .toArray()) as unknown as Report[];
    }

}