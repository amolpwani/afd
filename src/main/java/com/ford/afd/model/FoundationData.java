package com.ford.afd.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FoundationData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long rowId;
	private long columnId;
    private String columnValue;
  
    public FoundationData(long rowId, long columnId, String columnValue) {
		this.rowId = rowId;
		this.columnId = columnId;
		this.columnValue = columnValue;
	}

	public FoundationData() {
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

