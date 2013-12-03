/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hemouna.dao;

import com.hemouna.entidade.Bolsadesangue;
import com.hemouna.persistencia.HibernateUtil;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Fillipe
 */
public class BolsaDeSangueDao implements IDao {

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

    public boolean excluir(Bolsadesangue obj) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Object obj2 = session.load(Bolsadesangue.class, obj.getId());
            session.delete(obj2);
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
            Criteria criteria = this.session.createCriteria(new Bolsadesangue().getClass());
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
            String hql = "FROM Bolsadesangue";
            Query query = session.createQuery(hql);
            return query.list();
        } catch (HibernateException he) {
            return null;
        } finally {

            session.close();
        }
    }

    public List<Object> query(int numero, int tiposangue, int tipobolsa, int hospital, String tipo) {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            transaction = session.beginTransaction();
            Criteria criteria = this.session.createCriteria(Bolsadesangue.class);
            if (numero != 0) {
                criteria.add(Restrictions.eq("numero", numero));
            }
            if (tiposangue != 0) {
                criteria.add(Restrictions.eq("tiposangue.id", tiposangue));
            }
            if (tipobolsa != 0) {
                criteria.add(Restrictions.eq("tipobolsa.id", tipobolsa));
            }
            if (hospital != 0) {
                criteria.add(Restrictions.eq("hospital.id", hospital));
            }
            if (tipo != null) {
                criteria.add(Restrictions.isNull("paciente.id"));
            }
            return criteria.list();
        } catch (HibernateException he) {
            return null;
        } finally {

            session.close();
        }
    }

}
