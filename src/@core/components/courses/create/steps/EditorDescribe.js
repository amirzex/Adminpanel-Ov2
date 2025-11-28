import toast from "react-hot-toast";
import EditorComponent from "../../../editor-js";
import ButtonsForMove from "../button/ButtonsForMove";

const EditorDescribe = ({ stepper, setDesc }) => {
  const handleSave = (data) => {
    console.log("Received data from editor:", data);
    if (data.blocks.length !== 0) {
      setDesc({ Describe: JSON.stringify(data) });
      stepper.next();
    } else toast.error("لطفا متن پیام را وارد کنید");
  };
  return (
    <div>
      <EditorComponent onSave={handleSave} />
      <ButtonsForMove stepper={stepper} />
    </div>
  );
};

export default EditorDescribe;
