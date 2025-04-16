import { WEBSOCKET_URL } from "../constants/constants";

type WebSocketMessage = {
  requestType: string;
  token: string | null;
};

export class WebSocketService<T> {
  private ws: WebSocket | null = null;
  private reconnectTimeout: number | undefined = undefined;
  private pingInterval: number | undefined = undefined;
  private readonly url: string;

  constructor(type: string) {
    this.url = WEBSOCKET_URL(type);
  }

  connect(
    onMessage: (data: T) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: (error: Event) => void,
  ) {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WebSocket Connected");
      this.startPingInterval();
      onOpen?.();
    };

    this.ws.onmessage = (event) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (this.validateMessage(data)) {
          onMessage(data as T);
          console.log("WebSocket Message:", data);
        } else {
          console.warn("Received invalid WebSocket message format:", data);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket Disconnected");
      this.cleanup();
      onClose?.();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      onError?.(error);
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private validateMessage(message: any): boolean {
    if (!message || typeof message !== "object") return false;

    if (message.eventType === "ping" || message.eventType === "pong") {
      return true;
    }

    if (!message.payload) return false;

    if (
      message.eventType === "createOrder" ||
      message.eventType === "updateOrder"
    ) {
      return message.payload.data !== undefined;
    }

    return true;
  }

  send(message: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private startPingInterval() {
    this.pingInterval = setInterval(() => {
      this.send({ requestType: "ping", token: null });
    }, 30000);
  }

  private cleanup() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = undefined;
    }
  }

  disconnect() {
    this.cleanup();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
