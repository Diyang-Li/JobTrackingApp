const FormRow = ({ type, name, defaultValue, lableText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {lableText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || "lu"}
        required
      ></input>
    </div>
  );
};
export default FormRow;
