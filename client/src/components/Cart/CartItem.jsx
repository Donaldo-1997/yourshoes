import styles from "./CartItem.module.css";

const CartItem = ({ data, deleteProduct }) => {
  let { id, image, price, quantity } = data;
  return (
    <div className={styles.container}>
      <img src={image} alt="Img Not Found" width={100} />
      <div className={styles.info}>
        <h5>
          ${price} x {quantity} = ${price * quantity}
        </h5>
        <div className={styles.buttonsContainer}>
          <button onClick={() => deleteProduct(id)}>Eliminar Uno</button>
          <button onClick={() => deleteProduct(id, true)}>
            Eliminar Todos
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
