import { useForm } from "react-hook-form";
import Form from "@/components/forms/Form";
import FormRow from "@/components/forms/FormRow";
import Input from "@/components/forms/Input";
import FileInput from "@/components/forms/FileInput";
import Button from "@/components/ui/Button";
import Radio from "@/components/forms/Radio";
import { formatCurrency } from "@/utils/helpers";
import { useColorsAndSizes } from "@/context/ColorsAndSizesContext";
import { searchProducts } from "@/lib/data-service";
import CustomSelectAsync from "@/components/filters/CustomSelectAsync";
// import { useCreateVariant } from "./useCreateVariant";
// import { useEditVariant } from "./useEditVariant";

function CreateVariantForm({ VariantToEdit = {}, onCloseModal }) {
  // const { isCreating, createVariant } = useCreateVariant();
  // const { isEditing, editVariant } = useEditVariant();

  // const isWorking = isCreating || isEditing;
  const isWorking = false;
  const { colors, sizes } = useColorsAndSizes();

  const { id: editId, ...editValues } = VariantToEdit;
  // check if it's an edit form or not || add form
  const isEditSession = Boolean(editId);
  // install react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState,
  } = useForm({
    // {defaultValues} --> set all default values for all fields in the form
    defaultValues: isEditSession ? editValues : {},
  });
  // get the input error from formstate
  const { errors } = formState;

  // watch fields
  const basePrice = watch("basePrice") || "";
  const priceDiff = Number(watch("priceDifference") || 0);

  const finalPrice = basePrice ? basePrice + priceDiff : null;

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
      <FormRow label="Product name" error={errors?.productId?.message}>
        <CustomSelectAsync
          filterField="product"
          cacheOptions
          defaultOptions
          loadOptions={searchProducts}
          disabled={isWorking || isEditSession}
          value={watch("productId")}
          onChange={({ target, option }) => {
            const productId = target.value;
            const product = option; // we finally have full object

            setValue("productId", productId, { shouldValidate: true });

            if (product) {
              setValue("basePrice", product.basePrice, {
                shouldValidate: true,
              });
            }
          }}
          placeholder="Search a product..."
        />
        <input
          type="hidden"
          {...register("productId", { required: "Product is required" })}
        />
      </FormRow>

      <FormRow label="Color" error={errors?.color?.message}>
        <Radio
          disabled={isWorking || isEditSession}
          data={colors}
          {...register("color", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Size" error={errors?.size?.message}>
        <Radio
          disabled={isWorking || isEditSession}
          data={sizes}
          {...register("size", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Base price">
        <Input
          type="text"
          id="basePrice"
          disabled // un-editable (base price of product)
          value={formatCurrency(basePrice)}
        />
        <Input type="hidden" value={basePrice} {...register("basePrice")} />
      </FormRow>

      <FormRow
        label="Price difference(±) (Optional)"
        error={errors?.priceDifference?.message}
        helper={
          finalPrice !== null
            ? `= ${formatCurrency(finalPrice)} ${priceDiff ? "(" + (priceDiff > 0 ? "+" : "") + formatCurrency(priceDiff) + ")" : ""}`
            : null
        }
      >
        <Input
          type="number"
          id="priceDifference"
          defaultValue={0}
          disabled={isWorking}
          {...register("priceDifference", {
            validate: (value) =>
              // getValue() --> react-form tech allow to get value from other inputs
              Math.abs(Number(value)) <= Number(getValues().basePrice) * 0.5 ||
              "Price difference shouldn't be more than 50% of base price",
          })}
        />
      </FormRow>

      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <Input
          type="number"
          id="quantity"
          defaultValue={0}
          disabled={isWorking}
          {...register("quantity", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Quanity is a positive number",
            },
          })}
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
