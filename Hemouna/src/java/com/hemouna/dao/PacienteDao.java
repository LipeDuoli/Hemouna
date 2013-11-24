/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.dao;

import com.hemouna.entidade.Bolsadesangue;
import com.hemouna.entidade.Paciente;
import com.hemouna.persistencia.HibernateUtil;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Fillipe
 */
public class PacienteDao implements IDao {

    private Session session;
    private Transaction transaction;

    @Override
    public boolean salvar(Object obj) {
        try {
            this.session = HibernateUtil.getSessionFactory().openSession();
            this.transaction = session.beginTransaction();
            this.session.save(obj);
            this.transaction.commit();
            return true;
        } catch (HibernateException he) {
            transaction.rollback();
            return false;
        } finally {
            this.session.close();
        }
    }

    @Override
    public boolean alterar(Object obj) {
        try {
            this.session = HibernateUtil.getSessionFactory().openSession();
            this.transaction = session.beginTransaction();
            this.session.update(obj);
            this.transaction.commit();
            return true;
        } catch (HibernateException he) {
            transaction.rollback();
            return false;
        } finally {
            this.session.close();
        }
    }

    @Override
    public boolean excluir(Object obj) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            session.delete(obj);
            transaction.commit();
            return true;
        } catch (HibernateException he) {
            transaction.rollback();
            return false;
        } finally {
            session.close();
        }
    }

    @Override
    public List<Object> getId(int id) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Criteria criteria = this.session.createCriteria(new Paciente().getClass());
            criteria.add(Restrictions.eq("id", id));
            return criteria.list();
        } catch (HibernateException he) {
            return null;
        } finally {
            session.close();
        }
    }

    @Override
    public List<Object> listarTodos() {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            String hql = "FROM Paciente";
            Query query = session.createQuery(hql);
            return query.list();
        } catch (HibernateException he) {
            return null;
        } finally {
            session.close();
        }
    }

    public List<Object> getbolsas(int id) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Criteria criteria = this.session.createCriteria(Bolsadesangue.class);
            criteria.add(Restrictions.eq("paciente.id", id));
            return criteria.list();
        } catch (HibernateException he) {
            return null;
        } finally {
            session.close();
        }
    }

    public List<Object> query(String nome, int tiposangue, int hospital) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Criteria criteria = this.session.createCriteria(Paciente.class);
            if (nome != null) {
                criteria.add(Restrictions.like("nome", nome, MatchMode.START));
            }
            if (tiposangue != 0) {
                criteria.add(Restrictions.eq("tiposangue.id", tiposangue));
            }
            if(hospital != 0){
                criteria.add(Restrictions.eq("hospital.id", hospital));
            }
            return criteria.list();
        } catch (HibernateException he) {
            return null;
        } finally {
            session.close();
        }
    }

}
