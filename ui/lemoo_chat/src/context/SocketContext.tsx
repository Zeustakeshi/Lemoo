import { Client } from "@stomp/stompjs";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

type SocketProviderProps = {
    children: React.ReactNode;
};

interface ISocketContext {
    client: Client | null;
    disconnect: () => void;
    isConnected: boolean;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        connect();
        return () => {
            if (client) {
                disconnect();
            }
        };
    }, []);

    const connect = () => {
        if (client && client.connected) {
            console.log("WebSocket is already connected.");
            return;
        }

        const newClient = new Client({
            brokerURL: "ws://localhost:4008/ws",
            debug: function (str) {
                // console.log("STOMP Debug:", str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: {
                Authorization: "Bearer " + Cookies.get("access_token"),
            },
            onConnect: (frame) => {
                console.log("WebSocket connected successfully:", frame);
                setIsConnected(true);
            },
            onStompError: (frame) => {
                console.error("STOMP Error:", frame);
                setIsConnected(false);
            },
            onWebSocketError: (event) => {
                console.error("WebSocket Error:", event);
                setIsConnected(false);
            },
            onWebSocketClose: (event) => {
                console.log("WebSocket closed:", event);
                setIsConnected(false);
            },
            onDisconnect: (frame) => {
                console.log("WebSocket disconnected:", frame);
                setIsConnected(false);
            },
        });

        newClient.activate();
        setClient(newClient);
    };

    const disconnect = () => {
        if (client) {
            client.deactivate();
            console.log("WebSocket disconnected.");
            setIsConnected(false);
        }
    };

    const values = {
        client,
        disconnect,
        isConnected,
    };

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const context = useContext(SocketContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};

export { SocketProvider, useSocket };
