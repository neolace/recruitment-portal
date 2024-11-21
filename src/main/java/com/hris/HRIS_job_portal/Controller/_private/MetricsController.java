package com.hris.HRIS_job_portal.Controller._private;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import io.micrometer.core.instrument.MeterRegistry;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MetricsController {

    private final MeterRegistry meterRegistry;

    public MetricsController(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    @GetMapping("/api/v2/metrics/task-executor")
    public Map<String, Object> getTaskExecutorMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("active", meterRegistry.get("taskExecutor.active").gauge().value());
        metrics.put("queueSize", meterRegistry.get("taskExecutor.queued").gauge().value());
        metrics.put("poolSize", meterRegistry.get("taskExecutor.pool.size").gauge().value());
        return metrics;
    }
}

