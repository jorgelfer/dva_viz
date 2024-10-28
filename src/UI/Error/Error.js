import classes from './Error.module.css';

export default function Error({ title, message, onConfirm }) {
  return (
    <div className={classes.erro}>
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
