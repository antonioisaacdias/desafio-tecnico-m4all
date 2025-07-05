package com.media4all.backend.infraestructure.scheduler;

import com.media4all.backend.business.PrinterSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.EnableScheduling;

@Slf4j
@Component
@RequiredArgsConstructor
public class PrinterSyncScheduler {

    private final PrinterSyncService printerSyncService;

    @Scheduled(fixedRateString = "${printer.sync.rate}")
    public void syncPrinters() {
        log.info("Iniciando sincronização de impressoras com API externa.");
        try {
            printerSyncService.syncPrinters();
            log.info("Sincronização de impressoras concluída com sucesso.");
        } catch (Exception e) {
            log.error("Erro ao sincronizar impressoras: {}", e.getMessage(), e);
        }
    }
}