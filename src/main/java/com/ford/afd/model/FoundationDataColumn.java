package com.ford.afd.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TADF005_FOUNDATION_DATA_CLMN")
public class FoundationDataColumn extends BaseEntity<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TADF005_CLMN_D")
    private long id;
    
    @Column(name = "TADF005_CLMN_N")
    private String uiColumnName;
    
    @Column(name = "TADF005_CLMN_CMT")
	private String hoverHelp;
    
    @Column(name = "TADF005_UNIQUE_F")
	private boolean uniqueColumn;
    
    @Column(name = "TADF005_INPUT_TYPE")
	private String inputType;
    
    @Column(name = "TADF005_VAL")
    private String value;
    
    @Column(name = "TADF005_MANDATORY_F")
    private boolean mandatory;
    
    @Column(name = "TADF005_SORT_ORDER")
    private int sortOrder;
    
    @Column(name = "TADF005_EDITABLE_F")
    private boolean editable;
    
    @Column(name = "TADF005_LNTH")
    private int length;
    
    @Column(name = "TADF005_SELECTED_LIST_ID")
    private long selectedListId;
    
    @Column(name = "TADF005_LIST_DISPLAY_TYPE")
    private String listDisplayType;
    
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

    public FoundationDataColumn(String uiColumnName, String hoverHelp, boolean unique, String inputType, String value,
			boolean mandatory, int sortOrder, boolean editable, int length, long selectedListId, String listDisplayType) {
		this.uiColumnName = uiColumnName;
		this.hoverHelp = hoverHelp;
		this.uniqueColumn = unique;
		this.inputType = inputType;
		this.value = value;
		this.mandatory = mandatory;
		this.sortOrder = sortOrder;
		this.editable = editable;
		this.length = length;
		this.selectedListId = selectedListId;
		this.listDisplayType = listDisplayType;
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

	public long getSelectedListId() {
		return selectedListId;
	}

	public void setSelectedListId(long selectedListId) {
		this.selectedListId = selectedListId;
	}

	public String getListDisplayType() {
		return listDisplayType;
	}

	public void setListDisplayType(String listDisplayType) {
		this.listDisplayType = listDisplayType;
	}

}

