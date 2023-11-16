import Input from "./Input";

const PersonForm = ({
  handleChange,
  handlePhoneChange,
  onSubmit,
  newPhone,
  newName,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input text="name:" onChange={handleChange} value={newName} />
        <Input
          text="number:"
          type="phone"
          onChange={handlePhoneChange}
          value={newPhone}
        />

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
