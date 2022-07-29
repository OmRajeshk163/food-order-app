import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

const MealItemForm = (props) => {
  const [isValid, setIsvalid] = useState(true);
  const amountInputRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const inputValue = amountInputRef.current.value;
    const numberInputValue = +inputValue;
    console.log("valtethe", amountInputRef.current.value);
    if (
      inputValue.trim().length === 0 ||
      numberInputValue < 0 ||
      numberInputValue > 5
    ) {
      setIsvalid(false);
      return;
    }
    setIsvalid(true);
    props.onAddHandler(numberInputValue);
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: "amount_" + props.id,
          type: "number",
          // min: "1",
          // max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button type="submit">+ Add</Button>
      {!isValid && (
        <p style={{ color: "red" }}>Please enter Valid Number (1 to 5)</p>
      )}
    </form>
  );
};

export default MealItemForm;
