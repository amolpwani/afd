package com.ford.afd.model;

import javax.persistence.*;

@Entity
public class ListDataItems {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String code;
    private String description;
    private boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="listData_id",nullable = false)
    private ListData listData;
    
    private Integer parentlistId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return code;
    }

    public void setName(String name) {
        this.code = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

	public ListData getListData() {
		return listData;
	}

	public void setListData(ListData listData) {
		this.listData = listData;
	}

	public Integer getParentlistId() {
		return parentlistId;
	}

	public void setParentlistId(Integer parentlistId) {
		this.parentlistId = parentlistId;
	}
}
