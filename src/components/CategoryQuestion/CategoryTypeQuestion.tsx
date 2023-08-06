import { GiMove } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import QuestionModel from "../../interfaces/QuestionModel";
import { useDispatch } from "react-redux";
import { questionsActions } from "../../store/questionSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRef } from "react";

const CategoryTypeQuestion = ({ question }: { question: QuestionModel }) => {
  const dispatch = useDispatch();
  const questionRef = useRef<HTMLInputElement>(null);

  let categoryOptions: Array<{ value: string; label: string }> = [];
  question.categories.forEach((element) => {
    categoryOptions.push({
      value: element.name,
      label: element.name,
    });
  });

  const questionChangeHandler = () => {
    if (questionRef.current != null) {
      const q = questionRef.current.value;
      dispatch(
        questionsActions.questionChange({
          id: question.id,
          question: q,
        })
      );
    }
  };

  const categoryChangeHandler = (category: string, index: number) => {
    dispatch(
      questionsActions.changeCategoryName({
        id: question.id,
        index: index,
        categoryName: category,
      })
    );
  };

  const onAddCategory = () => {
    dispatch(
      questionsActions.addNewCategory({
        id: question.id,
      })
    );
  };

  const removeCategory = (index: number) => {
    let newCat: Array<{ id: string; name: string }> = [];
    question.categories.forEach((element, i) => {
      if (i !== index) {
        newCat.push(element);
      }
    });

    dispatch(
      questionsActions.setCategory({
        id: question.id,
        categories: newCat,
      })
    );
  };

  const itemChangeHandler = (item: string, index: number, category: string) => {
    dispatch(
      questionsActions.changeItemValues({
        id: question.id,
        index: index,
        category: category,
        item: item,
      })
    );
  };

  const onAddItem = () => {
    if (question.categories.length === 0) {
      alert("Please add atleast one category");
    } else {
      dispatch(
        questionsActions.addNewItem({
          id: question.id,
          category: question.categories[0].name,
        })
      );
    }
  };

  const removeItem = (index: number) => {
    let newItem: Array<{ id: string; name: string; category: string }> = [];
    question.items.forEach((element, i) => {
      if (i !== index) {
        newItem.push(element);
      }
    });

    dispatch(
      questionsActions.setItem({
        id: question.id,
        items: newItem,
      })
    );
  };

  const onDragEndHandlerForCategory = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newCategories = [...question.categories];
    const [reordedCat] = newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, reordedCat);

    dispatch(
      questionsActions.setCategory({
        id: question.id,
        categories: newCategories,
      })
    );
  };

  return (
    <>
      <input
        type="text"
        className="focus:outline-none border-b-2 border-x-gray-400 text-base pb-1 w-1/2 focus:border-[#176B87]"
        placeholder="Please enter question ... ?"
        ref={questionRef}
        defaultValue={question.question}
        onChange={questionChangeHandler}
      />
      <div className="mt-6">
        <p className="mb-2">Categories : </p>
        <DragDropContext onDragEnd={onDragEndHandlerForCategory}>
          <Droppable droppableId="category">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {question.categories.map((element, index) => {
                  return (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="flex items-center gap-3 mx-4 my-2"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <GiMove />
                          <input
                            type="text"
                            className="focus:outline-none border-b-2 border-x-gray-400 text-base pb-1 w-1/6 focus:border-[#176B87]"
                            defaultValue={element.name}
                            onChange={(event) => {
                              categoryChangeHandler(event.target.value, index);
                            }}
                          />
                          <AiOutlineClose
                            className="z-[100] cursor-pointer"
                            onClick={() => {
                              removeCategory(index);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className="flex items-center gap-3 text-gray-500 py-3 mx-4"
          onClick={onAddCategory}
        >
          <GiMove />
          <input
            type="text"
            className="focus:outline-none  text-base pb-1 w-2/6"
            defaultValue="Add new category"
            disabled
          />
        </div>
        <div className="pt-4">
          <p className="mb-2">Items : </p>
          {question.items.map((element, index) => {
            return (
              <div
                className="flex items-center gap-4 mx-4 my-3"
                key={element.id}
              >
                <input
                  type="text"
                  className="focus:outline-none border-b-2 border-x-gray-400 text-base pb-1 w-1/6 focus:border-[#176B87]"
                  defaultValue={element.name}
                  onChange={(event) => {
                    itemChangeHandler(
                      event.target.value,
                      index,
                      element.category
                    );
                  }}
                />
                <AiOutlineClose
                  onClick={() => {
                    removeItem(index);
                  }}
                />
                <Select
                  options={categoryOptions}
                  className="w-2/6"
                  placeholder={question.categories[0].name}
                  onChange={(newValue) => {
                    if (newValue != null) {
                      itemChangeHandler(element.name, index, newValue.label);
                    }
                  }}
                />
              </div>
            );
          })}
          <div
            className="flex items-center gap-3 text-gray-500 py-3 mx-4"
            onClick={onAddItem}
          >
            <input
              type="text"
              className="focus:outline-none border-b-2 border-x-gray-400 text-base pb-1 w-1/6 focus:border-[#176B87]"
              defaultValue="Add item"
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryTypeQuestion;
