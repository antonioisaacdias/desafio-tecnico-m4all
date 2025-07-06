'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";

type StatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  status: string;
  paperCapacity?: number;
  id?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function StatusModal({
  isOpen,
  onClose,
  name,
  status,
  paperCapacity,
  id,
}: StatusModalProps) {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && id) {
      setLoading(true);
      setError(null);
      setDetails(null);

      fetch(`${baseUrl}/printers/${id}/status`)
        .then((res) => {
          if (!res.ok) throw new Error("Falha ao buscar dados");
          return res.json();
        })
        .then((data) => setDetails(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setDetails(null);
      setError(null);
      setLoading(false);
    }
  }, [isOpen, id]);

  const statusColorClass = status === "ONLINE" ? "text-green-600" : "text-red-600";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPrint} className="text-blue-600" style={{ fontSize: "23px" }} />
            {name}
          </DialogTitle>
          <DialogDescription>Informações detalhadas da impressora selecionada.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <p className="mb-2">
              Status atual: <span className={`font-semibold ${statusColorClass}`}>{status}</span>
            </p>

            {loading && <p className="text-gray-600">Carregando detalhes...</p>}

            {error && (
              <p className="text-red-600 mb-2">
                Erro ao carregar dados: {error}
              </p>
            )}

            {paperCapacity !== undefined && (
              <p className="mb-4">
                Capacidade de papel: <span className="font-semibold">{paperCapacity}</span>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
