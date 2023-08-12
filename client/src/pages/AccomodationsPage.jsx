import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


const AccomodationsPage = () => {
  const navigate = useNavigate();


  return (
    <>
        <button
          onClick={() => navigate("./new")}
          className="primary flex justify-center items-center gap-2 mt-12 mx-auto max-w-sm "
        >
          <AiOutlinePlus />
          <span>Add new place</span>
        </button>

       
    </>
  );
};

export default AccomodationsPage;
