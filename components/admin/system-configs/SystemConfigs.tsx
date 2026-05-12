"use client";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

import SystemConfigsItem from "./SystemConfigsItem";
import { useResetSystemConfigs } from "./useResetSystemConfigs";
import { useSystemConfigs } from "./useSystemConfigs";
import Modal from "@/components/ui/Modal";
import ConfirmChange from "@/components/ui/ConfirmChange";

function SystemConfigs() {
  const { configs, isPending } = useSystemConfigs();
  const { mutate: resetDefaults, isPending: isResetting } =
    useResetSystemConfigs();

  if (isPending) {
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );
  }

  const hasOverrides = configs.some((config) => !config.isDefault);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {configs.map((config) => (
          <SystemConfigsItem key={config.key} config={config} />
        ))}
      </div>
      <Modal>
        {hasOverrides ? (
          <div className="fit-content">
            <Modal.Open opens="confirm-reset-defaults">
              <Button type="button" variant="danger">
                Reset to defaults
              </Button>
            </Modal.Open>
          </div>
        ) : null}
        <Modal.Window name="confirm-reset-defaults">
          <ConfirmChange
            message={
              <p>
                Are you sure you want to reset all system configs to their
                default?
              </p>
            }
            onConfirm={() => resetDefaults()}
            disabled={isResetting}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default SystemConfigs;
