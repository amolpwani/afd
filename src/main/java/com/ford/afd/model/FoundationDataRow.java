package com.ford.afd.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TAFD004_FOUNDATION_DATA")
public class FoundationDataRow extends BaseEntity<String>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TAFD004_FDN_DATA_D")
    private long id;
    
    @Column(name = "TAFD004_FDN_DATA_ROW_D")
    private long rowId;
    
    @Column(name = "TAFD004_FDN_DATA_COL_D")
	private long columnId;
    
    @Column(name = "TAFD004_FDN_DATA_COL_V")
    private String columnValue;
  
    public FoundationDataRow(long rowId, long columnId, String columnValue) {
		this.rowId = rowId;
		this.columnId = columnId;
		this.columnValue = columnValue;
	}

	public FoundationDataRow() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    public long getRowId() {
		return rowId;
	}

	public void setRowId(long rowId) {
		this.rowId = rowId;
	}

	public long getColumnId() {
		return columnId;
	}

	public void setColumnId(long columnId) {
		this.columnId = columnId;
	}

	public String getColumnValue() {
		return columnValue;
	}

	public void setColumnValue(String columnValue) {
		this.columnValue = columnValue;
	}
}

