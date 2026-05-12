"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import type {
  SystemConfigItem,
  SystemConfigValueType,
  UpdateSystemConfigDto,
} from "@/types/system-configs";

import { useUpdateSystemConfig } from "./useUpdateSystemConfig";
import Input from "@/components/forms/admin/Input";

const SUPPORTED_VALUE_TYPES: SystemConfigValueType[] = [
  "NUMBER",
  "STRING",
  "BOOLEAN",
];

type SystemConfigsItemProps = {
  config: SystemConfigItem;
};

function SystemConfigsItem({ config }: SystemConfigsItemProps) {
  const { mutate, isPending } = useUpdateSystemConfig();

  const initialInputValue = useMemo(() => getInputValue(config), [config]);
  const initialBooleanValue = useMemo(() => getBooleanValue(config), [config]);

  const [valueInput, setValueInput] = useState(initialInputValue);
  const [booleanValue, setBooleanValue] = useState(initialBooleanValue);
  const [isPublic, setIsPublic] = useState(config.isPublic);

  useEffect(() => {
    setValueInput(initialInputValue);
    setBooleanValue(initialBooleanValue);
    setIsPublic(config.isPublic);
  }, [initialInputValue, initialBooleanValue, config.isPublic]);

  const isSupportedType = SUPPORTED_VALUE_TYPES.includes(config.type);
  const isValueDirty =
    config.type === "BOOLEAN"
      ? booleanValue !== initialBooleanValue
      : valueInput !== initialInputValue;

  const isPublicDirty = isPublic !== config.isPublic;
  const isDirty = isValueDirty || isPublicDirty;

  function handleCancel() {
    setValueInput(initialInputValue);
    setBooleanValue(initialBooleanValue);
    setIsPublic(config.isPublic);
  }

  function handleSave() {
    if (!isDirty) return;

    const payload: UpdateSystemConfigDto = {};

    if (isValueDirty) {
      payload.value = toPayloadValue(config.type, valueInput, booleanValue);
    }

    if (isPublic !== config.isPublic) {
      payload.isPublic = isPublic;
    }

    mutate({ key: config.key, payload });
  }

  return (
    <div className="bg-primary-0 border-primary-200 flex flex-wrap items-start gap-3 rounded-lg border p-4 shadow-sm">
      <div className="min-w-[200px] flex-1">
        <p className="text-primary-900 text-base font-semibold">
          {config.name}
        </p>
        {config.description ? (
          <p className="text-primary-600 text-sm">{config.description}</p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-8 md:min-w-fit">
        <div className="w-[180px]">
          {config.type === "BOOLEAN" ? (
            <ToggleSwitch
              value={booleanValue}
              className={isValueDirty ? "border-amber-600" : ""}
              onChange={setBooleanValue}
              disabled={isPending}
              ariaLabel={`Toggle ${config.key}`}
            />
          ) : (
            <Input
              id={config.key}
              type={config.type === "NUMBER" ? "number" : "text"}
              className={isValueDirty ? "border-amber-600" : ""}
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
              disabled={!isSupportedType || isPending}
            />
          )}
        </div>

        <div className="text-primary-700 flex items-center gap-2 text-sm whitespace-nowrap">
          <span>Public</span>
          <ToggleSwitch
            value={isPublic}
            className={isPublicDirty ? "border-amber-600" : ""}
            onLabel="True"
            offLabel="False"
            onChange={setIsPublic}
            disabled={isPending}
            ariaLabel={`Toggle public for ${config.key}`}
          />
        </div>
        <div className="flex min-w-[140px] items-center gap-2">
          {isDirty && (
            <>
              <Button
                type="button"
                variant="secondary"
                size="small"
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="small"
                onClick={handleSave}
                disabled={isPending}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getInputValue(config: SystemConfigItem): string {
  if (config.type === "NUMBER") {
    if (config.value === null || config.value === undefined) {
      return "";
    }
    return String(config.value);
  }

  if (config.type === "STRING") {
    return typeof config.value === "string"
      ? config.value
      : String(config.value ?? "");
  }

  if (config.type === "BOOLEAN") {
    return "";
  }

  if (typeof config.value === "string") {
    return config.value;
  }

  if (config.value === null || config.value === undefined) {
    return "";
  }

  try {
    return JSON.stringify(config.value);
  } catch {
    return String(config.value);
  }
}

function getBooleanValue(config: SystemConfigItem): boolean {
  if (config.type !== "BOOLEAN") return false;
  return Boolean(config.value);
}

function toPayloadValue(
  type: SystemConfigValueType,
  valueInput: string,
  booleanValue: boolean,
): string {
  if (type === "BOOLEAN") {
    return booleanValue ? "true" : "false";
  }

  if (type === "NUMBER") {
    return valueInput.trim();
  }

  return valueInput;
}

export default SystemConfigsItem;
