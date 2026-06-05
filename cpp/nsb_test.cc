#include "nsb.h"
#include "nsb_client.h"

int testSocketInterface() {
    using namespace nsb;
    // Testing
    LOG(INFO) << "Creating socket interface..." << std::endl;
    SocketInterface sif = SocketInterface(std::string("127.0.0.1"), 65432);
    LOG(INFO) << "Sending a message..." << std::endl;
    sif.sendMessage(Comms::Channel::CTRL, "hello");
    LOG(INFO) << "Receiving a message..." << std::endl;
    int timeout = 5;
    std::future<std::string> futureResponse = sif.listenForMessage(Comms::Channel::CTRL, &timeout);
    std::string response = futureResponse.get();
    if (response.empty()) {
        LOG(ERROR) << "\tNo response received." << std::endl;
    } else {
        LOG(INFO) << "\tReceived response: " << response << std::endl;
    }
    LOG(INFO) << "Disconnecting socket interace..." << std::endl;
    sif.closeConnection();
    LOG(INFO) << "Done!" << std::endl;
    return 0;
}

int testRedisConnector() {
    using namespace nsb;
    // Testing Redis Connector
    std::string thisAppId = "app1";
    std::string thatAppId = "app2";
    std::string redisServerAddr = "127.0.0.1";
    RedisConnector thisConn = RedisConnector(thisAppId, redisServerAddr, 5050);
    RedisConnector thatConn = RedisConnector(thatAppId, redisServerAddr, 5050);
    std::string sendPayload = "hola mundo";
    std::string key = thisConn.store(sendPayload);
    std::string recvPayload = thatConn.checkOut(key);
    DLOG(INFO) << "Payload sent: " << sendPayload << std::endl;
    DLOG(INFO) << "Payload received: " << recvPayload << std::endl;
    return 0;
}

int testLifecycle() {
    using namespace nsb;
    // Create app client.
    const std::string idApp1 = "node1";
    const std::string idApp2 = "node2";
    const std::string idSim1 = "node1";
    const std::string idSim2 = "node2";
    std::string nsbDaemonAddr = "127.0.0.1";
    int nsbDaemonPort = 65432;
    NSBAppClient app1 = NSBAppClient(idApp1, nsbDaemonAddr, nsbDaemonPort);
    NSBAppClient app2 = NSBAppClient(idApp2, nsbDaemonAddr, nsbDaemonPort);
    NSBSimClient sim1 = NSBSimClient(idSim1, nsbDaemonAddr, nsbDaemonPort);
    NSBSimClient sim2 = NSBSimClient(idSim2, nsbDaemonAddr, nsbDaemonPort);
    app1.ping();
    app2.ping();
    sim1.ping();
    sim2.ping();
    // Send a message.
    std::string payload1 = "Hello from app1";
    std::string payload2 = "Hola del app1";
    std::string payload3 = "Bonjour de l'app2";
    std::string payload4 = "Geia sou apo app2";
    LOG(INFO) << "----- SENDING MESSAGES -----" << std::endl;
    app1.send(idApp2, payload1);
    app1.send(idApp2, payload2);
    app2.send(idApp1, payload3);
    app2.send(idApp1, payload4);
    // Go through the simulator.
    for (int i=0; i<3; i++) {
        LOG(INFO) << "----- FETCHING FROM SIM. " << idSim1 << " ITERATION " << i << " -----" << std::endl;
        MessageEntry fetchedMsg1 = sim1.fetch();
        if (fetchedMsg1.exists()) {
            sim2.post(idApp1, idApp2, fetchedMsg1.payload_obj);
        } else {
            if (i < 2) {LOG(ERROR) << "No message to fetch." << std::endl;}
            else {LOG(INFO) << "Didn't fetch message and that's okay." << std::endl;}
        }
        LOG(INFO) << "----- FETCHING FROM SIM. " << idSim2 << " ITERATION " << i << " -----" << std::endl;
        MessageEntry fetchedMsg2 = sim2.fetch();
        if (fetchedMsg2.exists()) {
            sim1.post(idApp2, idApp1, fetchedMsg2.payload_obj);
        } else {
            if (i < 2) {LOG(ERROR) << "No message to fetch." << std::endl;}
            else {LOG(INFO) << "Didn't fetch message and that's okay." << std::endl;}
        }
    }
    // Receive a message.
    LOG(INFO) << "----- RECEIVING FROM APP " << idApp1 << " -----" << std::endl;
    for (int i=0; i<3; i++) {
        MessageEntry receivedMsg1 = app1.receive();
        if (receivedMsg1.exists()) {
            LOG(INFO) << "Received payload: " << receivedMsg1.payload_obj << std::endl;
        } else {
            if (i < 2) {LOG(ERROR) << "Didn't receive payload." << std::endl;}
            else {LOG(INFO) << "Didn't receive payload and that's okay." << std::endl;}
        }
    }
    // Receive a message.
    LOG(INFO) << "----- RECEIVING FROM APP " << idApp2 << " -----" << std::endl;
    for (int i=0; i<3; i++) {
        MessageEntry receivedMsg2 = app2.receive();
        if (receivedMsg2.exists()) {
            LOG(INFO) << "Received payload: " << receivedMsg2.payload_obj << std::endl;
        } else {
            if (i < 2) {LOG(ERROR) << "Didn't receive payload." << std::endl;}
            else {LOG(INFO) << "Didn't receive payload and that's okay." << std::endl;}
        }
    }
    // Exit.
    app1.exit();
    return 0;
}

int main() {
    using namespace nsb;
    // Set up logging.
    NsbLogSink log_output = NsbLogSink();
    absl::InitializeLog();
    absl::log_internal::AddLogSink(&log_output);
    // return testSocketInterface();
    // return testRedisConnector();
    return testLifecycle();
}