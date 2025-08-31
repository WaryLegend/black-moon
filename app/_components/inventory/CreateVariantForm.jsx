import { useForm } from "react-hook-form";
import Form from "@/app/_components/Forms/Form";
import FormRow from "@/app/_components/Forms/FormRow";
import Input from "@/app/_components/Forms/Input";
import FileInput from "@/app/_components/Forms/FileInput";
import Textarea from "@/app/_components/Forms/Textarea";
import Button from "@/app/_components/Button";
// import { useCreateVariant } from "./useCreateVariant";
// import { useEditVariant } from "./useEditVariant";

function CreateVariantForm({ VariantToEdit = {}, onCloseModal }) {
  // const { isCreating, createVariant } = useCreateVariant();
  // const { isEditing, editVariant } = useEditVariant();

  // const isWorking = isCreating || isEditing;
  const isWorking = false;

  const { id: editId, ...editValues } = VariantToEdit;
  // check if it's an edit form or not || add form
  const isEditSession = Boolean(editId);
  // install react-hook-
  // {defaultValues} --> set all default values for all fields in the form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // get the input error from formState
  const { errors } = formState;

  function onSubmitForm(data) {
    // type "string" mean it's an imagePath --> after created
    const checkimage =
      typeof data.image === "string" ? data.image : data.image?.[0];

    if (isEditSession)
      editVariant(
        { newVariantData: { ...data, image: checkimage }, id: editId },
        {
          onSuccess: () => {
            reset(); // reset form
            onCloseModal?.();
          },
        },
      );
    else
      createVariant(
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
      <FormRow label="Variant name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
            validate: (value) =>
              value > 0 || "Regular price should be greater than 0",
          })}
        />
      </FormRow>

      <FormRow label="Category" error={errors?.category?.message}>
        <Input
          type="text"
          id="category"
          disabled={isWorking}
          {...register("category", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Description for Variant"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Variant's photo" error={errors?.image?.message}>
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
          {isEditSession ? "Edit Variant" : "Add new Variant"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateVariantForm;
