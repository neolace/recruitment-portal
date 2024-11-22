package com.hris.HRIS_job_portal.Controller._private;

import com.hris.HRIS_job_portal.Service._private.GeoLocationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import io.micrometer.core.instrument.MeterRegistry;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v2/metrics")
public class MetricsController {

    @Autowired
    private GeoLocationService geoLocationService;

    private final MeterRegistry meterRegistry;

    public MetricsController(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    @GetMapping("/task-executor")
    public Map<String, Object> getTaskExecutorMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("active", meterRegistry.get("taskExecutor.active").gauge().value());
        metrics.put("queueSize", meterRegistry.get("taskExecutor.queued").gauge().value());
        metrics.put("poolSize", meterRegistry.get("taskExecutor.pool.size").gauge().value());
        return metrics;
    }

    @GetMapping("/user-activity")
    public Map<String, Object> getUserActivityMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("activeUsers", meterRegistry.counter("user.active.count").count());
        metrics.put("averageSessionDuration", meterRegistry.timer("user.session.duration").mean(TimeUnit.SECONDS));
        return metrics;
    }

    @GetMapping("/geolocation")
    public JsonObject getGeoLocation(@RequestParam String ipAddress) {
        try {
            return geoLocationService.getGeoLocation(ipAddress);
        } catch (Exception e) {
            e.printStackTrace();
            JsonObject error = new JsonObject();
            error.addProperty("error", e.getMessage());
            return error;
        }
    }
}

