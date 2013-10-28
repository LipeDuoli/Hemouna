package com.hemouna.entidade;
// Generated 28/10/2013 09:47:21 by Hibernate Tools 3.6.0

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Tiposangue generated by hbm2java
 */
@Entity
@Table(name = "tiposangue", catalog = "hemounadb"
)
public class Tiposangue implements java.io.Serializable {

    private Integer id;
    private String tiposangue;

    public Tiposangue() {
    }

    public Tiposangue(String tiposangue) {
        this.tiposangue = tiposangue;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)

    @Column(name = "id", unique = true, nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "tiposangue", nullable = false, length = 3)
    public String getTiposangue() {
        return this.tiposangue;
    }

    public void setTiposangue(String tiposangue) {
        this.tiposangue = tiposangue;
    }

}
