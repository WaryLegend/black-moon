import { useForm } from "react-hook-form";
import Form from "@/components/forms/Form";
import FormRow from "@/components/forms/FormRow";
import Input from "@/components/forms/Input";
import FileInput from "@/components/forms/FileInput";
import Radio from "@/components/forms/Radio";
import { groupOptions } from "@/utils/constants";
import Button from "@/components/ui/Button";
// import { useCreateCategory } from "./useCreateCategory";
// import { useEditCategory } from "./useEditCategory";

function CreateCategoryForm({ CategoryToEdit = {}, onCloseModal }) {
  // const { isCreating, createCategory } = useCreateCategory();
  // const { isEditing, editCategory } = useEditCategory();

  // const isWorking = isCreating || isEditing;
  const isWorking = false;

  const { id: editId, ...editValues } = CategoryToEdit;
  // check if it's an edit form or not || add form
  const isEditSession = Boolean(editId);
  // install react-hook-
  // {defaultValues} --> set all default values for all fields in the form
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // get the input error from formState
  const { errors } = formState;

  function onSubmitForm(data) {
    // type "string" mean it's an imagePath --> after created
    const checkimage =
      typeof data.image === "string" ? data.image : data.image?.[0];

    if (isEditSession)
      editCategory(
        { newCategoryData: { ...data, image: checkimage }, id: editId },
        {
          onSuccess: () => {
            reset(); // reset form
            onCloseModal?.();
          },
        },
      );
    else
      createCategory(
        { ...data, image: checkimage },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Category name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Group" error={errors?.group?.message}>
        <Radio
          disabled={isWorking || isEditSession}
          className="lg:gap-10"
          data={groupOptions}
          {...register("group", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Category's photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! Reset the form*/}
        <Button
          variant="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit category" : "Add new category"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCategoryForm;
