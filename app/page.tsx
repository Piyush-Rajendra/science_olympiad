import Link from 'next/link'
import styles from './styles/header.module.css'
import NewTournamentForm from './components/newTournamentForm';
import TournamentView from './components/tournamentView';

export default function app() {
 return (
  <div>
  <div className={styles.header}>
    <div className={styles.titleSection}>
      <h1 className={styles.title}>Science Olympiad</h1>
      <p className={styles.subtitle}>Exploring the world of science</p>
    </div>
    <nav className={styles.nav}>
      <div className={styles.dropdown}>
        <span className={styles.navLink}>Tournament</span>
        <div className={styles.dropdownContent}>
          <Link href="/tournament/create" className={styles.navLink}>
            Create Tournament
          </Link>
          <Link href="/tournament/manage" className={styles.navLink}>
            Manage Tournament
          </Link>
          <Link href="/tournament/score" className={styles.navLink}>
            Score
          </Link>
        </div>
      </div>
      <Link href="/attendance" className={styles.navLink}>Attendance</Link>
      <div className={styles.separator} />
      <Link href="/account" className={styles.navLink}>Account</Link>
    </nav>
  </div>
  <div>
      <NewTournamentForm />
  </div>
</div>
 );
}