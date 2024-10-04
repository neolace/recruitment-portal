package com.hris.HRIS_job_portal.Model.payment;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection = "portal_invoices")
public class InvoicesModel {
    @Id
    private String id;
    private String companyId;
    private String invoice_number;
    private String amount;
    private String date_issued;
    private String due_date;
    private String status;
}
