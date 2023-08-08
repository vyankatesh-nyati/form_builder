import React, { useCallback, useEffect, useState } from "react";
import QuestionModel from "../../interfaces/QuestionModel";
import randomColor from "randomcolor";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { formResponseActions } from "../../store/formResponseSlice";

interface props {
  question: QuestionModel;
  index: number;
}

const FormCategory: React.FC<props> = ({ question, index }) => {
  const answers: Array<any> = useSelector(
    (state: any) => state.formResponse.answers
  );
  const dispatch = useDispatch();
  const qIndex = answers.findIndex((state) => state.questionId === question.id);
  const [items, setItems] = useState(question.items);
  //   console.log(answers[qIndex].solution);

  const addNewCategoryToAnswer = useCallback(
    (category: string, categoryId: string) => {
      dispatch(
        formResponseActions.categoryAddCategoryToAnswer({
          id: question.id,
          category: category,
          categoryId: categoryId,
        })
      );
    },
    [dispatch, question.id]
  );

  useEffect(() => {
    question.categories.forEach((category) => {
      addNewCategoryToAnswer(category.name, category.id);
    });
  }, [addNewCategoryToAnswer, question.categories]);

  const onDragEndHandler = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.source.droppableId === result.destination.droppableId) {
      return;
    }
    // console.log(result);
    const newItems = [...items];
    // console.log("test");
    dispatch(
      formResponseActions.categoryAddItemToCategory({
        id: question.id,
        categoryId: result.destination.droppableId,
        item: newItems[result.source.index],
      })
    );
    newItems.splice(result.source.index, 1);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="bg-white m-8 rounded-md p-4">
        <p className="">Question {index + 1} :</p>
        <Droppable droppableId="items">
          {(provided) => (
            <div
              className="flex gap-4 justify-center mt-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => {
                return (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <p
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="border-2 px-2 rounded-md border-gray-600"
                      >
                        {item.name}
                      </p>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
        <div className="flex justify-center gap-8 mt-8">
          {qIndex !== -1 &&
            answers[qIndex].solution.map((cItem: any) => {
              //   console.log(cItem);
              const color = randomColor();
              return (
                <Droppable
                  droppableId={cItem.categoryId}
                  key={cItem.categoryId}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="border-2 rounded-md border-gray-600"
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      <div className="border-b-2 px-4 border-gray-600 py-2">
                        <p>{cItem.categoryName}</p>
                      </div>
                      <div className="h-20">
                        {cItem.categoryItems.map((it: any) => {
                          return (
                            <p
                              key={it.id}
                              className="border-2 px-2 rounded-md border-gray-600 m-2 bg-white"
                            >
                              {it.name}
                            </p>
                          );
                        })}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default FormCategory;
