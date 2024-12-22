package com.hris.HRIS_job_portal.Controller._private;

import com.hris.HRIS_job_portal.Model._private.WhitelistDomains;
import com.hris.HRIS_job_portal.Service._private.WhitelistDomainsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/whitelist-domains")
public class WhitelistDomainsController {

    @Autowired
    private WhitelistDomainsService whitelistDomainsService;

    @PostMapping("/add")
    public WhitelistDomains addWhitelistDomain(@RequestBody WhitelistDomains domain) {
        return whitelistDomainsService.addWhitelistDomain(domain);
    }

    @GetMapping("/get")
    public WhitelistDomains getWhitelistDomain(@RequestBody String domain) {
        return whitelistDomainsService.getWhitelistDomain(domain);
    }

    @DeleteMapping("/delete")
    public void deleteWhitelistDomain(@RequestBody String id) {
        whitelistDomainsService.deleteWhitelistDomain(id);
    }

    @GetMapping("/get-all")
    public List<WhitelistDomains> getAllWhitelistDomains() {
        return whitelistDomainsService.getAllWhitelistDomains();
    }

    @GetMapping("/get-active")
    public List<WhitelistDomains> getWhitelistDomainsByActive(@RequestBody boolean active) {
        return whitelistDomainsService.getWhitelistDomainsByActive(active);
    }

    @PutMapping("/update")
    public WhitelistDomains updateWhitelistDomain(@RequestBody WhitelistDomains domain) {
        return whitelistDomainsService.updateWhitelistDomain(domain);
    }

    @PutMapping("/change-active")
    public WhitelistDomains changeActive(@RequestBody String id) {
        return whitelistDomainsService.changeActive(id);
    }

    @GetMapping("/get-by-request-by")
    public List<WhitelistDomains> getByRequestBy(@RequestBody String requestedBy) {
        return whitelistDomainsService.getByRequestBy(requestedBy);
    }

    @GetMapping("/get-by-domain-and-active")
    public WhitelistDomains getByDomainAndActive(@RequestBody String domain, @RequestBody boolean active) {
        return whitelistDomainsService.getByDomainAndActive(domain, active);
    }
}
