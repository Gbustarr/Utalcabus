export const Checkbox = ({ isChecked, onChange }: { isChecked: boolean, onChange: (isChecked: boolean) => void }) => {

    const handleCheckboxChange = () => {
      const newValue = !isChecked;
      onChange(newValue);
    };
  
    return (
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5"
        />
        <span className="ml-2 text-md text-textoCard">{isChecked ? 'Habilitado' : 'Deshabilitado'}</span>
      </div>
    );
}