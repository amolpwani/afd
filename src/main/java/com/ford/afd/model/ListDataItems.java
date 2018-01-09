package com.ford.afd.model;

import javax.persistence.*;

@Entity
public class ListDataItems {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Integer code;
    private String description;
    private String status;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="LISTID",nullable = false)
    private ListData listData;*/
    private Integer listId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
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

    public Integer getListId() {
        return listId;
    }

    public void setListId(Integer listId) {
        this.listId = listId;
    }
}
