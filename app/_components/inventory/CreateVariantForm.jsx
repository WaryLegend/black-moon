import { useForm } from "react-hook-form";
import Form from "@/app/_components/Forms/Form";
import FormRow from "@/app/_components/Forms/FormRow";
import Input from "@/app/_components/Forms/Input";
import FileInput from "@/app/_components/Forms/FileInput";
import Button from "@/app/_components/Button";
import Selector from "@/app/_components/Forms/Selector";
import Radio from "@/app/_components/Forms/Radio";
import { formatCurrency } from "@/app/_utils/helpers";
// import { useCreateVariant } from "./useCreateVariant";
// import { useEditVariant } from "./useEditVariant";

//test data same from products
const fakedata = [
  {
    id: 1,
    name: "Áo sơ mi",
    basePrice: 180000,
  },
  {
    id: 2,
    name: "Quần tây",
    basePrice: 250000,
  },
  {
    id: 3,
    name: "Áo polo",
    basePrice: 160000,
  },
  {
    id: 4,
    name: "Quần short kaki",
    basePrice: 140000,
  },
  {
    id: 5,
    name: "Áo hoodie",
    basePrice: 220000,
  },
];

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
      <FormRow label="Product name" error={errors?.name?.message}>
        <Selector
          id="name"
          data={fakedata}
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Color" error={errors?.color?.message}>
        <Radio
          disabled={isWorking}
          data={[
            { value: "white" },
            { value: "blue" },
            { value: "green" },
            { value: "black" },
            { value: "brown" },
            { value: "pink" },
            { value: "orange" },
          ]}
          {...register("color", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Size" error={errors?.size?.message}>
        <Radio
          disabled={isWorking}
          data={[
            { value: "XS" },
            { value: "S" },
            { value: "M" },
            { value: "L" },
            { value: "XL" },
            { value: "XXL" },
            { value: "XXXL" },
          ]}
          {...register("size", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Base price">
        <Input
          type="text"
          id="basePrice"
          disabled // un-editable (base price of product)
          value={formatCurrency(150000)} // need logic get the base price base on Product name got selected
        />
      </FormRow>

      <FormRow label="Price difference [higher or lower] (Optional)">
        <Input
          type="number"
          id="priceDifference"
          defaultValue={0}
          disabled={isWorking}
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
