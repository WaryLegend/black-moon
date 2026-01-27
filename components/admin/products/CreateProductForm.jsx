import { useForm } from "react-hook-form";
import Form from "@/components/forms/Form";
import FormRow from "@/components/forms/FormRow";
import Input from "@/components/forms/Input";
import FileInput from "@/components/forms/FileInput";
import Textarea from "@/components/forms/Textarea";
import Button from "@/components/ui/Button";
// import { useCreateProduct } from "./useCreateProduct";
// import { useEditProduct } from "./useEditProduct";

function CreateProductForm({ ProductToEdit = {}, onCloseModal }) {
  // const { isCreating, createProduct } = useCreateProduct();
  // const { isEditing, editProduct } = useEditProduct();

  // const isWorking = isCreating || isEditing;
  const isWorking = false;

  const { id: editId, ...editValues } = ProductToEdit;
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
      editProduct(
        { newProductData: { ...data, image: checkimage }, id: editId },
        {
          onSuccess: () => {
            reset(); // reset form
            onCloseModal?.();
          },
        },
      );
    else
      createProduct(
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
      <FormRow label="Product name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Base price" error={errors?.basePrice?.message}>
        <Input
          type="number"
          id="basePrice"
          disabled={isWorking}
          {...register("basePrice", {
            required: "This field is required",
            validate: (value) =>
              value > 0 || "Base price should be greater than 0",
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
        label="Description for product"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Product's photo" error={errors?.image?.message}>
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
          {isEditSession ? "Edit product" : "Add new product"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
