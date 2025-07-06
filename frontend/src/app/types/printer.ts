export type PrinterStatus = "ONLINE" | "OFFLINE";

export type Printer = {
    id: string;
    name: string;
    model: string;
    location: string;
    status: PrinterStatus;
    paperCapacity: number;
    createdAt: string;
};