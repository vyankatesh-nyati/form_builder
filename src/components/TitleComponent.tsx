import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { titleActions } from "../store/titleSlice";

const TitleComponent = () => {
  const title = useSelector((state: any) => state.title.title);
  const titleRef = useRef<HTMLInputElement>(title);
  const dispatch = useDispatch();

  const titleChangeHandler = () => {
    const newTitle = titleRef.current.value;
    dispatch(titleActions.changeTitle({ title: newTitle }));
  };

  return (
    <div className="flex justify-center w-full p-4">
      <div className="w-2/3 bg-white rounded-xl pb-4">
        <div className="w-full bg-[#64CCC5] h-2 mb-4 rounded-t-lg"></div>
        <div className="p-4">
          <input
            className="focus:outline-none border-b-2 border-x-gray-400 text-4xl pb-3"
            defaultValue={title}
            ref={titleRef}
            onChange={titleChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleComponent;
