package com.ford.afd.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FoundationDataColumn {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String uiColumnName;
	private String hoverHelp;
	private boolean uniqueColumn;
	private String inputType;
    private String value;
    private boolean mandatory;
    private int sortOrder;
    private boolean editable;
    private int length;

    public FoundationDataColumn(String uiColumnName, String hoverHelp, boolean unique, String inputType, String value,
			boolean mandatory, int sortOrder, boolean editable, int length) {
		this.uiColumnName = uiColumnName;
		this.hoverHelp = hoverHelp;
		this.uniqueColumn = unique;
		this.inputType = inputType;
		this.value = value;
		this.mandatory = mandatory;
		this.sortOrder = sortOrder;
		this.editable = editable;
		this.length = length;
	}

	public FoundationDataColumn() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    public String getUiColumnName() {
		return uiColumnName;
	}

	public void setUiColumnName(String uiColumnName) {
		this.uiColumnName = uiColumnName;
	}

	public String getHoverHelp() {
		return hoverHelp;
	}

	public void setHoverHelp(String hoverHelp) {
		this.hoverHelp = hoverHelp;
	}

	public boolean isUniqueColumn() {
		return uniqueColumn;
	}

	public void setUniqueColumn(boolean unique) {
		this.uniqueColumn = unique;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isMandatory() {
		return mandatory;
	}

	public void setMandatory(boolean mandatory) {
		this.mandatory = mandatory;
	}

	public int getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public String getInputType() {
		return inputType;
	}

	public void setInputType(String inputType) {
		this.inputType = inputType;
	}
}

