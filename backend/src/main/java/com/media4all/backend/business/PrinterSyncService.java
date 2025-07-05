package com.media4all.backend.business;

import com.media4all.backend.infraestructure.client.ExternalApiClient;
import com.media4all.backend.infraestructure.dto.ExternalPrinterDTO;
import com.media4all.backend.infraestructure.entitys.Printer;
import com.media4all.backend.infraestructure.entitys.PrinterStatus;
import com.media4all.backend.infraestructure.entitys.SyncStatistic;
import com.media4all.backend.infraestructure.repository.PrinterRepository;
import com.media4all.backend.infraestructure.repository.SyncStatisticRepository;
import com.media4all.backend.infraestructure.sync.SyncStatistics;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrinterSyncService {

    private final ExternalApiClient externalApiClient;
    private final PrinterRepository printerRepository;
    private final SyncStatistics syncStatistics;
    private final SyncStatisticRepository syncStatisticRepository;

    public void syncPrinters() {
        syncStatistics.setTotalSyncs(syncStatistics.getTotalSyncs() + 1);
        int processed = 0;
        try {
            List<ExternalPrinterDTO> externalPrinters = externalApiClient.fetchPrinters();
            for (ExternalPrinterDTO dto : externalPrinters) {
                PrinterStatus statusEnum;
                try {
                    statusEnum = PrinterStatus.valueOf(dto.getStatus().toUpperCase());
                } catch (Exception e) {
                    statusEnum = PrinterStatus.OFFLINE;
                }

                UUID printerId = dto.getId() != null ? UUID.fromString(dto.getId()) : UUID.randomUUID();
                Instant createdAt = dto.getCreatedAt() != null ? Instant.parse(dto.getCreatedAt()) : Instant.now();

                Optional<Printer> existing = printerRepository.findById(printerId);

                Printer printer = Printer.builder()
                        .id(printerId)
                        .name(dto.getName())
                        .model(dto.getModel())
                        .location(dto.getLocation())
                        .status(statusEnum)
                        .paperCapacity(dto.getPaperCapacity())
                        .createdAt(existing.map(Printer::getCreatedAt).orElse(createdAt))
                        .build();

                printerRepository.save(printer);
                processed++;
            }
            syncStatistics.setSuccessCount(syncStatistics.getSuccessCount() + 1);
        } catch (Exception e) {
            syncStatistics.setFailureCount(syncStatistics.getFailureCount() + 1);
            throw e;
        } finally {
            syncStatistics.setLastProcessed(processed);
            syncStatistics.setLastSyncAt(DateTimeFormatter.ISO_INSTANT.format(Instant.now()));

            SyncStatistic stat = SyncStatistic.builder()
                    .totalSyncs(syncStatistics.getTotalSyncs())
                    .successCount(syncStatistics.getSuccessCount())
                    .failureCount(syncStatistics.getFailureCount())
                    .lastProcessed(processed)
                    .lastSyncAt(syncStatistics.getLastSyncAt())
                    .createdAt(Instant.now())
                    .build();
            syncStatisticRepository.save(stat);
        }
    }
}