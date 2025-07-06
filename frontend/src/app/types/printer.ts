export type PrinterStatus = "online" | "offline";

export type Printer = {
    id: string;
    name: string;
    model: string;
    location: string;
    status: PrinterStatus;
    paperCapacity: number;
    createdAt: string;
};