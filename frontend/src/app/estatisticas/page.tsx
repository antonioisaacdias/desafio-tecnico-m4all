'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart, faSync, faCheckCircle, faExclamationTriangle, faClock, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import { SyncStatistics } from "../types/statistics";
import toast from 'react-hot-toast';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function Estatisticas() {
    const [statistics, setStatistics] = useState<SyncStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatistics();
    }, []);

    async function fetchStatistics() {
        setLoading(true);
        try {
            // Força dados frescos com timestamp único a cada carregamento
            const timestamp = Date.now();
            const response = await fetch(`${baseUrl}/sync/statistics?_t=${timestamp}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            if (!response.ok) throw new Error("Failed to fetch statistics");
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
            toast.error("Erro ao carregar estatísticas");
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateString: string | null) {
        if (!dateString) return "Nunca";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Data inválida";
            return date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return "Data inválida";
        }
    }

    function calculateSuccessRate() {
        if (!statistics || statistics.totalSyncs === 0) return 0;
        return Math.round((statistics.successCount / statistics.totalSyncs) * 100);
    }

    return (
        <div className="max-w-7xl flex flex-col gap-6 mx-auto">
            <div className="flex items-center gap-3">
                <div className="bg-brand inline-block py-2 px-3 rounded-lg">
                    <FontAwesomeIcon icon={faMagnifyingGlassChart} className="text-white" style={{ fontSize: "30px" }} />
                </div>
                <h1 className="text-3xl font-bold text-brand">Estatísticas de Sincronização</h1>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
                </div>
            ) : statistics ? (
                <>
                    {/* Cards de Estatísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard
                            title="Total de Sincronizações"
                            value={statistics.totalSyncs}
                            icon={faSync}
                            color="bg-blue-500"
                        />
                        
                        <StatCard
                            title="Sincronizações Bem-sucedidas"
                            value={statistics.successCount}
                            icon={faCheckCircle}
                            color="bg-green-500"
                            subtitle={`${calculateSuccessRate()}% de sucesso`}
                        />
                        
                        <StatCard
                            title="Sincronizações Falharam"
                            value={statistics.failureCount}
                            icon={faExclamationTriangle}
                            color="bg-red-500"
                        />
                        
                        <StatCard
                            title="Registros Processados"
                            value={statistics.lastProcessed}
                            icon={faDatabase}
                            color="bg-purple-500"
                            subtitle="Última sincronização"
                        />
                        
                        <StatCard
                            title="Última Sincronização"
                            value={statistics.lastSyncAt ? formatDate(statistics.lastSyncAt).split(' ')[0] : "Nunca"}
                            icon={faClock}
                            color="bg-orange-500"
                            subtitle={statistics.lastSyncAt ? formatDate(statistics.lastSyncAt).split(' ')[1] : ""}
                        />
                        
                        <StatCard
                            title="Taxa de Sucesso"
                            value={`${calculateSuccessRate()}%`}
                            icon={faCheckCircle}
                            color="bg-emerald-500"
                            subtitle={`${statistics.successCount}/${statistics.totalSyncs} bem-sucedidas`}
                        />
                    </div>

                    {/* Resumo */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-medium">Taxa de Sucesso:</span> {calculateSuccessRate()}%
                            </div>
                            <div>
                                <span className="font-medium">Última Atividade:</span> {formatDate(statistics.lastSyncAt)}
                            </div>
                            <div>
                                <span className="font-medium">Status:</span> 
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                    statistics.failureCount === 0 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {statistics.failureCount === 0 ? 'Tudo funcionando' : 'Atenção necessária'}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">Nenhuma estatística disponível</p>
                </div>
            )}
        </div>
    );
}