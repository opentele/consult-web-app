import Client from './Client';

class ConsultRoomClient {
    client: Client;
    queueNumber;

    static fromConsultationRoomClientResponse(serverResource) {
        const consultRoomClient = new ConsultRoomClient();
        consultRoomClient.client = Client.fromServerResource(serverResource);
        consultRoomClient.queueNumber = serverResource.queueNumber;
        return consultRoomClient;
    }
}

export default ConsultRoomClient;
