package com.ford.afd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "TAFD004_FOUNDATION_DATA")
@EntityListeners(AuditingEntityListener.class)
public class FoundationDataRow {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TAFD004_FDN_DATA_D")
    private int id;
    
    @Column(name = "TAFD004_FDN_DATA_ROW_D")
    private int rowId;
    
    @Column(name = "TAFD004_FDN_DATA_COL_D")
	private int columnId;
    
    @Column(name = "TAFD004_FDN_DATA_COL_V")
    private String columnValue;
    
    @CreatedBy
    @Column(name = "TAFD004_CREATE_USER_C", updatable =  false)
    protected String createdBy;
    
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TAFD004_CREATE_S", updatable =  false)
    protected Date creationDate;
    
    @LastModifiedBy
    @Column(name = "TAFD004_LAST_UPDT_USER_C")
    protected String lastModifiedBy;
    
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TAFD004_LAST_UPDT_S")
    protected Date lastModifiedDate;
  
    public FoundationDataRow(int rowId, int columnId, String columnValue) {
		this.rowId = rowId;
		this.columnId = columnId;
		this.columnValue = columnValue;
	}

	public FoundationDataRow() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public int getRowId() {
		return rowId;
	}

	public void setRowId(int rowId) {
		this.rowId = rowId;
	}

	public int getColumnId() {
		return columnId;
	}

	public void setColumnId(int columnId) {
		this.columnId = columnId;
	}

	public String getColumnValue() {
		return columnValue;
	}

	public void setColumnValue(String columnValue) {
		this.columnValue = columnValue;
	}
}

