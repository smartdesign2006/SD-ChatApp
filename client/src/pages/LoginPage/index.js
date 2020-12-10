import React from 'react'
import styles from './index.module.css'
import PageHeader from '../../components/PageHeader'
import LoginMain from '../../components/LoginMain'

const LoginPage = () => {
    return (
        <div className={styles['login-container']}>
            <PageHeader />
            <LoginMain />         
        </div>
    )
}

export default LoginPage
