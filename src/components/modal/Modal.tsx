import styles from "./Modal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren & {
  trigger: React.ReactNode;
  title: string;
};

export const Modal = (props: ModalProps) => {
  const { trigger, children } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Close className={styles.close}>X</Dialog.Close>
          </div>
          <div className={styles.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
