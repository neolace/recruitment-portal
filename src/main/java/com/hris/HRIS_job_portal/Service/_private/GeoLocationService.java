package com.hris.HRIS_job_portal.Service._private;

import com.hris.HRIS_job_portal.Config.ConfigUtility;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import okhttp3.Request;
import okhttp3.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Service
public class GeoLocationService {

    @Autowired
    private ConfigUtility configUtil;

    private final OkHttpClient httpClient = new OkHttpClient();

    public JsonObject getGeoLocation(String ipAddress) throws Exception {
        String url = "https://ipinfo.io/" + ipAddress + "/json?token=" + configUtil.getProperty("IPINFO_TOKEN");
        Request request = new Request.Builder() .url(url) .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new RuntimeException("Unexpected code " + response);
            Gson gson = new Gson();
            assert response.body() != null;
            return gson.fromJson(response.body().string(), JsonObject.class);
        }
    }
}

