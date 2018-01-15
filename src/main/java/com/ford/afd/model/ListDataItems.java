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

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="list_data_id",nullable = false)
//    private ListData listData;
    
    private Integer parentlistId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String name) {
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

	public Integer getParentlistId() {
		return parentlistId;
	}

	public void setParentlistId(Integer parentlistId) {
		this.parentlistId = parentlistId;
	}
}
