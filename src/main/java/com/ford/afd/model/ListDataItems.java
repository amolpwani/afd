package com.ford.afd.model;

import javax.persistence.*;

@Entity
public class ListDataItems {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String description;
    private String status;

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
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
