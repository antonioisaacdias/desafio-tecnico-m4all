package com.media4all.backend.infraestructure.scheduler;

import com.media4all.backend.business.PrinterSyncService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PrinterSyncScheduler {

    private static final Logger log = LoggerFactory.getLogger(PrinterSyncScheduler.class);
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