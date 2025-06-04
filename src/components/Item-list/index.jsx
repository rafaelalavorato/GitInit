import styles from './styles.module.css';

const ItemList = ({title, description}) => {
  return (
    <div className={styles.itemList}>
      <strong>{title}</strong>
      <p>{description}</p>
      <hr />
    </div>
  )
}

export default ItemList;