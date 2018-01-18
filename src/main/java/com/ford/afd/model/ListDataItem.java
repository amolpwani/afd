package com.ford.afd.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ListDataItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int code;
    private String description;
    private boolean active;
    private long parentlistId;

    public ListDataItem(int code, String description, boolean active, long parentlistId) {
        this.code = code;
        this.description = description;
        this.setActive(active);
        this.parentlistId = parentlistId;
    }
    
    public ListDataItem() {
    	
    }

    /*@ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="LISTID",nullable = false)
        private ListData listData;*/

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public long getParentlistId() {
		return parentlistId;
	}

	public void setParentlistId(long parentlistId) {
		this.parentlistId = parentlistId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
